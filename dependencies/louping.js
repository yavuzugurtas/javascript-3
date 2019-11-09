/* scoping for JS 3

  do nothing to modify native console behavior

  intercept asserts for coloring the link

  render links to loupe that accumulate assert info
    - they are an unordered list
    each assert appends a new element
      green, orange, or red
      message is second arg

  no need for test cases, these exercises aren't about behavior

  needs hella error handling

*/


const louping = (() => {

  function louping(func) {

    if (typeof func !== "function") {
      console.error("TypeError:  argument must be a function, received:", func);
      return new TypeError("argument must be a function");
    }

    const container = louping.renderContainer(func);
    const log = louping.evaluate(func, container);

    document.body.appendChild(log.container);

    // log will gradually fill with asserts over time
    return log;
  }

  louping.evaluate = (func, container) => {
    const log = { name: func.name, func, consoleCalls: [], container };
    const consoleCatcher = louping.consoleWrapper(container, log);
    const funcBody = louping.funcBody(func);
    const asyncity = func.constructor.name === "AsyncFunction"
      ? "async" : '';
    try {
      // more descriptive errors than new Function
      // eval(`(${asyncity} function ${func.name}(){ const console = consoleCatcher; ${funcBody} })();`);
      eval(`(function ${func.name}(){ const console = consoleCatcher; try{ log.date = new Date(); ${funcBody}}catch(err){console.error(err)} })();`);
    } catch (err) {
      log.err = err;
      container.firstChild.firstChild.firstChild.firstChild.style.color = 'red';
      // make this more clear, use StackTrace ?
      console.log(err);
      container.childNodes[1].appendChild(louping.errorSearchComponent(err));
      return log;
    }
    return log;
  }


  louping.funcBody = (func) => {
    // https://stackoverflow.com/questions/14885995/how-to-get-a-functionss-body-as-string
    const string = func.toString();
    const bodyStart = string.indexOf("{") + 1;
    const bodyEnd = string.lastIndexOf("}");
    return string.substring(bodyStart, bodyEnd);
  }

  louping.consoleWrapper = (container, log) => {
    const catcher = Object.create(console);
    catcher.assert = function () {
      const assertion = {
        pass: Boolean(arguments[0]),
        assertion: arguments[0],
        messages: Array.from(arguments).slice(1)
      };
      log.consoleCalls.push(assertion);

      const { domLabel, consoleLabel } = louping.renderLabels(log);

      console.assert(
        assertion.assertion,
        consoleLabel,
        ...assertion.messages
      );

      const li = document.createElement('li');
      Boolean(assertion.assertion)
        ? li.style.color = 'green'
        : li.style.color = 'orange';

      if (assertion.messages.length === 0) {
        li.innerHTML = domLabel + 'Assertion ' + (assertion.pass ? 'passed.' : 'failed.');
      } else {
        // could be more clever, but for now just write exercises with strings
        li.innerHTML = domLabel + String(assertion.messages[0]);
      }
      const oldColor = container.firstChild.firstChild.firstChild.firstChild.style.color;
      container.firstChild.firstChild.firstChild.firstChild.style.color = (() => {
        if (oldColor === 'red') return 'red';
        if (oldColor === 'orange') return 'orange';
        if (oldColor === 'green' || oldColor === 'black' || oldColor === '') {
          return Boolean(assertion.assertion)
            ? 'green'
            : 'orange';
        }
      })();
      const time = louping.renderText((Math.round((100 * ((new Date()).getTime() - log.date.getTime()) / 1000)) / 100) + ' sec  ');
      time.style.float = 'right';
      li.appendChild(time);
      li.style.borderBottom = 'solid';
      container.childNodes[1].appendChild(li);
    }
    catcher.error = function () {
      const args = Array.from(arguments);
      const error = {
        err: args[0] instanceof Error ? args[0] : true,
        messages: args
      };
      log.consoleCalls.push(error);

      const { domLabel, consoleLabel } = louping.renderLabels(log);

      console.error(
        consoleLabel,
        ...error.messages
      );

      const li = document.createElement('li');
      li.style.color = 'red';

      if (error.messages.length === 0) {
        li.innerHTML = 'Error';
      } else {
        li.innerHTML = domLabel + (error.err instanceof Error ? `${error.err.name}: ${error.err.message}` : String(error.messages[0]));
      }
      if (error.err instanceof Error) {
        li.appendChild(louping.renderText(' '));
        li.appendChild(louping.renderErrorLink(error.err));
      }
      const time = louping.renderText((Math.round((100 * ((new Date()).getTime() - log.date.getTime()) / 1000)) / 100) + ' sec  ');
      time.style.float = 'right';
      li.appendChild(time);
      li.style.borderBottom = 'groove'
      container.firstChild.firstChild.firstChild.firstChild.style.color = 'red';
      container.childNodes[1].appendChild(li);
    };
    catcher.log = function () {
      const logs = {
        messages: Array.from(arguments)
      };
      log.consoleCalls.push(logs);

      const { domLabel, consoleLabel } = louping.renderLabels(log);

      console.log(
        consoleLabel,
        ...Array.from(arguments)
      );

      const li = document.createElement('li');
      li.style.color = 'black';

      if (logs.messages.length === 0) {
        li.innerHTML = '( empty log )';
      } else {
        // could be more clever, but for now just write exercises with strings
        li.innerHTML = domLabel + Array.from(arguments).reduce((acc, x) => acc + String(x) + '  ', '');
      }
      const time = louping.renderText((Math.round((100 * ((new Date()).getTime() - log.date.getTime()) / 1000)) / 100) + ' sec  ');
      time.style.float = 'right';
      li.appendChild(time);
      li.style.borderBottom = 'groove'
      container.childNodes[1].appendChild(li)
      // container.childNodes[1].innerHTML += li.outerHTML;
      // force synchronous redraw ?
    }
    return catcher;
  }

  // can imagine making this recursive for any depth
  louping.renderLabels = (log) => {
    const callerFuncName = StackTrace.getSync()[4].functionName;
    const callerName = callerFuncName ? callerFuncName : 'anonymous';
    const exerciseName = log.func.name;
    const consoleLabel = callerName === exerciseName
      ? `(${exerciseName}) `
      : `(${exerciseName}, ${callerName}) `;
    const domLabel = callerName === exerciseName
      ? ``
      : `(${callerName}) `;
    return { consoleLabel, domLabel };
  }

  louping.renderContainer = (func) => {
    const header = louping.exerciseNameComponent(func.name, louping.generateLoupeURL(func));

    const summary = document.createElement('summary');
    summary.appendChild(header);
    summary.style.fontSize = 'large';

    const code = louping.renderPrettyCode(func.toString());

    const pre = document.createElement('pre');
    pre.appendChild(code);

    const details = document.createElement('details');
    details.appendChild(summary);
    details.appendChild(pre);

    const olElement = document.createElement('ol');

    const container = document.createElement('div');
    container.id = func.name;
    container.appendChild(details);
    container.appendChild(olElement);
    container.appendChild(document.createElement('hr'));
    container.appendChild(document.createElement('br'));

    return container;
  }


  louping.exerciseNameComponent = (name, loupeURL) => {

    const text = document.createElement('text');

    text.innerHTML = name + ' ';
    text.style.fontSize = '120%'

    const loupeLink = document.createElement('a');
    loupeLink.innerHTML = '(study in loupe)';
    loupeLink.href = loupeURL;
    loupeLink.target = '_blank';


    const div = document.createElement('div');
    div.appendChild(text);
    div.appendChild(louping.renderText('  '));
    div.appendChild(loupeLink);
    div.style.display = 'inline';

    return div;
  }

  louping.errorSearchComponent = (err) => {

    const text = document.createElement('text');

    text.innerHTML += '<strong>' + err.name + '</strong>: ' + err.message;
    text.style.color = 'red';

    const duckDuckLink = louping.renderErrorLink(err);

    text.appendChild(louping.renderText('  '));
    text.appendChild(duckDuckLink);

    const div = document.createElement('div');
    div.appendChild(text);
    div.style.marginBottom = '5px';

    return div;
  }

  louping.renderErrorLink = (err) => {
    const duckDuckLink = document.createElement('a');
    duckDuckLink.innerHTML = '(DuckDuck Search)';
    duckDuckLink.href = `https://duckduckgo.com/?q=javascript+mdn+${err.name}+${err.message}&atb=v185-2_d&ia=web`;
    duckDuckLink.target = '_blank';
    return duckDuckLink;
  }

  louping.renderText = (string) => {
    // return document.createTextNode(string);
    string = String(string);
    const htmled = string
      .replace(/\s/g, '&#x000A0;')
      .replace(/\t/g, '&#x00009;')
      .replace(/\n/g, '&#x0000A;');
    const text = document.createElement('text');
    text.innerHTML = htmled;
    return text;
  };

  louping.renderPrettyCode = (code) => {
    const codeEl = document.createElement('code');
    codeEl.innerHTML = code;
    codeEl.className = "language-js line-numbers";
    Prism.highlightAllUnder(codeEl);
    const pre = document.createElement('pre');
    pre.appendChild(codeEl);
    pre.style.fontSize = '75%';
    return pre;
  }


  louping.generateLoupeURL = (func) => {
    const commentedSource = louping.commentTopBottom(func);
    const encoded = louping.loupeEncode(commentedSource);
    return "http://latentflip.com/loupe/?code=" + encoded + "!!!";
  }

  louping.commentTopBottom = (func) => {
    const funcString = func.toString();
    const splitFuncStr = funcString.split('\n');
    splitFuncStr[0] = '// ' + splitFuncStr[0];
    splitFuncStr[splitFuncStr.length - 1] = '// ' + splitFuncStr[splitFuncStr.length - 1];
    return splitFuncStr.join('\n');
  }

  louping.loupeEncode = (str) => {
    return encodeURIComponent(btoa(str));
  }

  return Object.freeze(louping);

})();
