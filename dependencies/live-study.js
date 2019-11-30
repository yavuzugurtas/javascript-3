// make collapse(d) a configuration option

const liveStudy = (preReports, name) => {


  if (preReports.hasOwnProperty('iReadTheInstructions')
    && preReports.iReadTheInstructions !== true) {

    const header = document.createElement('h2');
    header.innerHTML = name ? name : 'Live Study';


    const err = new Error('read the instructions, then set .iReadTheInstructions to true')
    const rtfm = document.createElement('pre');
    rtfm.innerHTML = `
${err.message}

${err.stack}`;
    rtfm.style.color = 'red';

    const div = document.createElement('div');
    div.id = 'live-study';
    div.appendChild(header);
    div.appendChild(rtfm);

    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('hr'));
    div.appendChild(document.createElement('hr'));

    const toReturn = {};
    toReturn.container = div;
    return toReturn;
  }


  // observe this
  let viewType = false;
  // true: sorted
  // false: ordered
  // string: status
  // arr[0]: search
  // de-hack this later

  const updateRendering = () => {
    // works by closure (not args) for now

    exercisesContainer.innerHTML = '';
    exercisesContainer.appendChild(
      viewType === false
        ? renderReports(exercises)
        : viewType === true
          ? renderSortedReports(exercises)
          : viewType instanceof Object
            ? renderReports(
              exercises.filter(r => r.view.innerHTML.match(new RegExp(input.value, 'gi')))
            )
            : renderOneStatus(exercises, viewType)
    );

    statsContainer.innerHTML = '';
    statsContainer.appendChild(renderStats(exercises));
  }

  const exercises = new Proxy(preReports, {
    // figure out how to getterize exercises that are added later
    // may one day need to deal with the length thing
    set(target, prop, val) { // assuming val is always a valid exercise
      target[prop] = val;

      updateRendering()

      return true;
    }
  })



  const observeReport = exercise => {
    let status = exercise.hasOwnProperty('status')
      ? exercise.status
      : exercise.hasOwnProperty('err')
        ? 'error'
        : 'no status';
    Object.defineProperty(
      exercise,
      'status',
      {
        get: function () {
          return status;
        },
        set: function (newStatus) {
          status = newStatus;
          updateRendering();
          // color changing would be the exercises's problem
        }
      }
    );
    return exercise;
  }
  exercises.forEach(observeReport);

  const renderStats = exercises => {
    const statuses = exercises.reduce((acc, r) => {
      if (acc.indexOf(r.status) === -1) {
        acc.push(r.status);
      }
      return acc;
    }, []);

    statuses.sort((a, b) => b.charCodeAt() - a.charCodeAt());

    const stats = statuses
      .reduce((acc, status) => {
        acc[status] = exercises.filter(r => r.status === status).length;
        return acc;
      }, {})


    return Object.keys(stats)
      .map(key => {
        const button = document.createElement('button');
        button.innerHTML = key + ': ' + stats[key];
        button.style.color = key === 'pass'
          ? 'green'
          : key === 'fail'
            ? 'orange'
            : key === 'error'
              ? 'red'
              : key === 'invalid'
                ? 'purple'
                : 'black';
        button.onclick = () => {
          exercisesContainer.innerHTML = '';
          exercisesContainer.appendChild(renderOneStatus(exercises, key));
          viewType = key;
        }
        const newLi = document.createElement('li');
        newLi.appendChild(button);
        return newLi;
      })
      .reduce((ul, li) => {
        ul.appendChild(li);
        return ul;
      }, document.createElement('ul'));
  }


  const renderReports = exercises => exercises
    .map(exercise => {
      const newLi = document.createElement('li');
      newLi.appendChild(exercise.view)
      return newLi;
    })
    .reduce((ol, li) => {
      ol.appendChild(li);
      return ol;
    }, document.createElement('ol'));


  const renderOneStatus = (exercises, statName) => {
    const header = document.createElement('h3');
    header.innerHTML = statName;

    const filteredReports = renderReports(
      exercises.filter(r => r.status === statName)
    );

    const container = document.createElement('div');
    container.id = statName;
    container.appendChild(header);
    container.appendChild(filteredReports);
    return container;
  };

  const renderSortedReports = exercises => {
    const statuses = exercises.reduce((acc, r) => {
      if (acc.indexOf(r.status) === -1) {
        acc.push(r.status);
      }
      return acc;
    }, []);

    statuses.sort((a, b) => b.charCodeAt() - a.charCodeAt());

    return statuses.reduce((acc, status) => {
      acc.appendChild(renderOneStatus(exercises, status));
      return acc;
    }, document.createElement('div'));
  }

  const header = (() => {
    const header = document.createElement('h2');
    header.innerHTML = typeof name === 'string' ? name : 'Live Study';
    return header;
  })();

  const statsContainer = (() => {
    const container = document.createElement('div');
    container.id = 'stats';
    container.appendChild(renderStats(exercises))
    return container;
  })();

  const reportsHeader = (() => {
    // const header = document.createElement('h2');
    // header.innerHTML = 'Exercises';
    const header = document.createElement('hr');
    return header;
  })();

  const searchAndSort = (() => {
    const div = document.createElement('div');
    div.id = 'search-and-sort';
    div.appendChild((() => {
      const inOrder = document.createElement('button');
      inOrder.innerHTML = 'view in order';
      inOrder.onclick = () => {
        exercisesContainer.innerHTML = '';
        exercisesContainer.appendChild(renderReports(exercises));
        viewType = false;
      };
      return inOrder;
    })());
    div.appendChild((() => {
      const sorted = document.createElement('button');
      sorted.innerHTML = 'view sorted';
      sorted.onclick = () => {
        exercisesContainer.innerHTML = '';
        exercisesContainer.appendChild(renderSortedReports(exercises));
        viewType = true;
      };
      return sorted;
    })());
    div.appendChild((() => {
      const searchButt = document.createElement('button');
      searchButt.innerHTML = 'search exercises';

      const renderSearchResults = () => {
        exercisesContainer.innerHTML = '';
        exercisesContainer.appendChild(renderReports(
          exercises.filter(r => r.view.innerHTML.match(new RegExp(input.value, 'gi')))
        ));
        viewType = [input.value];
      }

      searchButt.onclick = () => {
        // https://stackoverflow.com/questions/177719/case-insensitive-search
        renderSearchResults();
      };

      // https://stackoverflow.com/questions/11365632/how-to-detect-when-the-user-presses-enter-in-an-input-field
      const input = document.createElement('input');
      input.onkeyup = (e) => {
        if (e.keyCode === 13) {
          renderSearchResults();
        }
      };

      const container = document.createElement('div');
      container.appendChild(searchButt);
      container.appendChild(input);
      container.appendChild(document.createElement('hr'));

      return container;
    })());
    return div;
  })();

  const exercisesContainer = (() => {
    const container = document.createElement('div');
    container.id = 'exercises';
    container.appendChild(renderReports(exercises));
    return container;
  })();

  const container = (() => {
    const div = document.createElement('div');
    div.id = 'live-study';
    div.appendChild(header);

    div.appendChild(statsContainer);
    const summary = document.createElement('summary');
    summary.innerHTML = 'Live Studies:';

    const details = document.createElement('details');
    details.appendChild(summary);
    details.appendChild(document.createElement('br'));
    // div.appendChild(reportsHeader);
    details.appendChild(searchAndSort);
    details.appendChild(exercisesContainer);
    // quicker turn-around studying one exercise
    details.open = true; // more visual clutter, less clicking
    // details.open = false;
    div.appendChild(details);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('hr'));
    div.appendChild(document.createElement('hr'));
    return div;
  })();

  const liveStudy = {
    exercises, // make this also a getter?
    container
  }
  if (typeof name === 'string') {
    liveStudy.name = name;
  }
  return liveStudy;
};



