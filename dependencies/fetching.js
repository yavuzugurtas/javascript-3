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

const fetching = (() => {

  function fetching(func) {

    if (typeof func !== "function") {
      console.error("TypeError:  argument must be a function, received:", func);
      return new TypeError("argument must be a function");
    }

    const container = fetching.renderContainer(func);
    const log = fetching.evaluate(func, container);

    if (log.url) {
      container.firstChild.firstChild.appendChild(fetching.renderUrlLink(log.url));
    }

    document.body.appendChild(log.container);

    // log will gradually fill with asserts over time
    return log;
  }

  fetching.evaluate = (func, container) => {
    const log = { name: func.name, func, consoleCalls: [], container };
    const consoleCatcher = fetching.consoleWrapper(container, log);
    const funcBody = fetching.funcBody(func);
    const asyncity = func.constructor.name === "AsyncFunction"
      ? 'async' : '';
    try {
      // more descriptive errors than new Function, but not much with promises. too bad for fetch
      // eval(`log.url = (function ${func.name}(){ const console = consoleCatcher; try{${funcBody}}catch(err){console.error(err)} })();`);
      eval(`log.url = (${asyncity} function ${func.name}(){ const console = consoleCatcher; ${funcBody} })();`);
    } catch (err) {
      log.err = err;
      container.firstChild.firstChild.firstChild.firstChild.style.color = 'red';
      console.log(err);
      container.childNodes[1].appendChild(fetching.renderErrorSearchComponent(err));
      return log;
    }
    return log;
  }

  fetching.funcBody = (func) => {
    // https://stackoverflow.com/questions/14885995/how-to-get-a-functionss-body-as-string
    const string = func.toString();
    const bodyStart = string.indexOf("{") + 1;
    const bodyEnd = string.lastIndexOf("}");
    return string.substring(bodyStart, bodyEnd);
  }

  fetching.consoleWrapper = (container, log) => {
    const catcher = Object.create(console);
    catcher.assert = function () {
      const assertion = {
        pass: Boolean(arguments[0]),
        assertion: arguments[0],
        messages: Array.from(arguments).slice(1),
        stackTrace: StackTrace.getSync()
      };
      log.consoleCalls.push(assertion);

      const { domLabel, consoleLabel } = fetching.renderLabels(log);

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
        li.innerHTML = domLabel + assertion.messages.reduce((acc, x) => acc + String(x) + ', ', '');
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
      container.childNodes[1].appendChild(li);
    }
    catcher.error = function () {
      const args = Array.from(arguments);
      const error = {
        err: args[0] instanceof Error ? args[0] : true,
        messages: args,
        stackTrace: StackTrace.getSync()
      };
      log.consoleCalls.push(error);
      log.err = true;

      const { domLabel, consoleLabel } = fetching.renderLabels(log);

      console.error(
        consoleLabel,
        ...error.messages
      );

      const li = document.createElement('li');
      li.style.color = 'red';

      if (error.messages.length === 0) {
        li.innerHTML = domLabel + 'Error';
      } else {
        // could be more clever, but for now just write exercises with strings
        li.innerHTML = domLabel + (error.err instanceof Error
          ? `${error.err.name}: ${error.err.message}`
          : error.messages.reduce((acc, x) => acc + String(x) + ', ', ''));
      }
      if (error.err instanceof Error) {
        li.appendChild(fetching.renderText(' '));
        li.appendChild(fetching.renderErrorLink(error.err));
      }
      container.firstChild.firstChild.firstChild.firstChild.style.color = 'red';
      container.childNodes[1].appendChild(li);
    };
    catcher.log = function () {
      const logs = {
        messages: Array.from(arguments),
        stackTrace: StackTrace.getSync()
      };
      log.consoleCalls.push(logs);

      const { domLabel, consoleLabel } = fetching.renderLabels(log);

      console.log(
        consoleLabel,
        ...Array.from(arguments)
      );

      const li = document.createElement('li');
      li.style.color = 'black';

      if (logs.messages.length === 0) {
        li.innerHTML = domLabel + '( empty log )';
      } else {
        // could be more clever, but for now just write exercises with strings
        li.innerHTML = domLabel + Array.from(arguments).reduce((acc, x) => acc + String(x) + ', ', '');
      }
      container.childNodes[1].appendChild(li);
    }
    return catcher;
  }

  // can imagine making this recursive for any depth
  fetching.renderLabels = (log) => {
    const callerFuncName = log.consoleCalls[log.consoleCalls.length - 1].stackTrace[3].functionName;
    const callerName = callerFuncName ? callerFuncName : 'anonymous';
    const exerciseName = log.func.name;
    const ifError = false
      // const ifError = log.consoleCalls[log.consoleCalls.length - 1].err instanceof Error
      ? ', ln ' + log.consoleCalls[log.consoleCalls.length - 1].err.lineNumber
      : '';
    const consoleLabel = callerName === exerciseName
      ? `(${exerciseName}) `
      : `(${exerciseName}, ${callerName}${ifError}) `;
    const domLabel = callerName === exerciseName
      ? ``
      : `(${callerName}${ifError}) `;
    return { consoleLabel, domLabel };
  }

  fetching.renderContainer = (func) => {
    const header = fetching.exerciseNameComponent(func.name);

    const summary = document.createElement('summary');
    summary.appendChild(header);
    summary.style.fontSize = 'large';

    const prettyCode = fetching.renderPrettyCode(func.toString());

    const details = document.createElement('details');
    details.appendChild(summary);
    details.appendChild(prettyCode);

    const olElement = document.createElement('ol');

    const container = document.createElement('div');
    container.id = func.name;
    container.appendChild(details);
    container.appendChild(olElement);
    container.appendChild(document.createElement('hr'));
    container.appendChild(document.createElement('br'));

    return container;
  }


  fetching.exerciseNameComponent = (name) => {

    const text = document.createElement('text');

    text.innerHTML = name + ': ';
    text.style.fontSize = '120%';

    const div = document.createElement('div');
    div.appendChild(text);
    div.appendChild(fetching.renderText('  '));
    div.style.display = 'inline';

    return div;
  }

  fetching.renderUrlLink = (url) => {
    const apiLink = document.createElement('a');

    apiLink.innerHTML = url;
    apiLink.href = url;
    apiLink.target = '_blank';

    return apiLink;
  }


  fetching.renderPrettyCode = (code) => {
    const codeEl = document.createElement('code');
    codeEl.innerHTML = code;
    codeEl.className = "language-js line-numbers";
    Prism.highlightAllUnder(codeEl);
    const pre = document.createElement('pre');
    pre.appendChild(codeEl);
    pre.style.fontSize = '80%';
    return pre;
  }

  fetching.renderErrorSearchComponent = (err) => {

    const text = document.createElement('text');

    text.innerHTML += '<strong>' + err.name + '</strong>: ' + err.message;
    text.style.color = 'red';

    const duckDuckLink = fetching.renderErrorLink(err);

    text.appendChild(fetching.renderText('  '));
    text.appendChild(duckDuckLink);

    const div = document.createElement('div');
    div.appendChild(text);
    div.style.marginBottom = '5px';

    return div;
  }

  fetching.renderErrorLink = (err) => {
    const duckDuckLink = document.createElement('a');
    duckDuckLink.innerHTML = '(DuckDuck Search)';
    duckDuckLink.href = `https://duckduckgo.com/?q=javascript+mdn+${err.name}+${err.message}&atb=v185-2_d&ia=web`;
    duckDuckLink.target = '_blank';
    return duckDuckLink;
  }

  fetching.renderText = (string) => {
    const htmled = string
      .replace(/\s/g, '&#x000A0;')
      .replace(/\t/g, '&#x00009;')
      .replace(/\n/g, '&#x0000A;');
    const text = document.createElement('text');
    text.innerHTML = htmled;
    return text;
  };

  fetching.generateLoupeURL = (func) => {
    const body = fetching.commentTopBottom(func);
    const encoded = fetching.loupeEncode(body);
    return "http://latentflip.com/loupe/?code=" + encoded + "!!!";
  }

  fetching.commentTopBottom = (func) => {
    const funcString = func.toString();
    const splitFuncStr = funcString.split('\n');
    splitFuncStr[0] = '// ' + splitFuncStr[0];
    splitFuncStr[splitFuncStr.length - 1] = '// ' + splitFuncStr[splitFuncStr.length - 1];
    return splitFuncStr.join('\n');
  }

  fetching.loupeEncode = (str) => {
    return encodeURIComponent(btoa(str));
  }

  return Object.freeze(fetching);

})();
