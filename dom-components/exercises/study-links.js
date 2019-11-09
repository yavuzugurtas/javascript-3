try {

  function studyLinks(obj) {
    const h3El = document.createElement('h3');
    ; // set the h3's innerText

    const ulEl = document.createElement('ul');
    Object.keys(obj.links).forEach(key => {
      const aEl = document.createElement('a');
      // set the aEl's properties
      //
      //

      const liEl = document.createElement('li');
      // append the aEl & liEl
      //
    });

    const divEl = document.createElement('div');
    // append the header & list
    //
  }


  testComponent.attributesToTest = [
    'nodeName', "childElementCount", "href", 'children', "target", 'innerText'
  ];

  const testCases = [
    {
      name: 'first',
      args: [{
        topic: "the dom",
        links: {
          'js.info': "https://javascript.info/document",
          'MDN': "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          'HYF Ams': "https://github.com/HackYourFuture/JavaScript2/blob/master/Week1/README.md",
          'HYF Be': "https://hackyourfuture.be/inspecting-the-dom"
        }
      }],
      expected: {
        nodeName: 'DIV',
        childElementCount: 2,
        children: [
          {
            nodeName: 'H3',
            innerText: 'the dom',
            childElementCount: 0,
          },
          {
            nodeName: 'UL',
            childElementCount: 4,
            children: [
              {
                nodeName: 'LI',
                childElementCount: 1,
                children: [
                  {
                    nodeName: 'A',
                    innerText: 'js.info',
                    href: "https://javascript.info/document",
                    target: '_blank'
                  }
                ]
              },
              {
                nodeName: 'LI',
                childElementCount: 1,
                children: [
                  {
                    nodeName: 'A',
                    innerText: 'MDN',
                    href: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
                    target: '_blank'
                  }
                ]
              },
              {
                nodeName: 'LI',
                childElementCount: 1,
                children: [
                  {
                    nodeName: 'A',
                    innerText: 'HYF Ams',
                    href: "https://github.com/HackYourFuture/JavaScript2/blob/master/Week1/README.md",
                    target: '_blank'
                  }
                ]
              },
              {
                nodeName: 'LI',
                childElementCount: 1,
                children: [
                  {
                    nodeName: 'A',
                    innerText: 'HYF Be',
                    href: "https://hackyourfuture.be/inspecting-the-dom",
                    target: '_blank'
                  }
                ]
              },
            ]
          }
        ]
      }
    },
    {
      name: 'second',
      args: [{
        topic: "baking cookies",
        links: {
          'WikiHow': "https://www.wikihow.life/Bake-Cookies",
          'DuckDuck Search': "https://duckduckgo.com/?q=baking+cookies&t=ffab&atb=v189-1&ia=recipes",
          'in your car': "https://www.youtube.com/watch?v=X0lgg_qKaqw",
        }
      }],
      expected: {
        nodeName: 'DIV',
        childElementCount: 2,
        children: [
          {
            nodeName: 'H3',
            innerText: 'baking cookies',
            childElementCount: 0,
          },
          {
            nodeName: 'UL',
            childElementCount: 3,
            children: [
              {
                nodeName: 'LI',
                childElementCount: 1,
                children: [
                  {
                    nodeName: 'A',
                    innerText: 'WikiHow',
                    href: "https://www.wikihow.life/Bake-Cookies",
                    target: '_blank'
                  }
                ]
              },
              {
                nodeName: 'LI',
                childElementCount: 1,
                children: [
                  {
                    nodeName: 'A',
                    innerText: 'DuckDuck Search',
                    href: "https://duckduckgo.com/?q=baking+cookies&t=ffab&atb=v189-1&ia=recipes",
                    target: '_blank'
                  }
                ]
              },
              {
                nodeName: 'LI',
                childElementCount: 1,
                children: [
                  {
                    nodeName: 'A',
                    innerText: 'in your car',
                    href: "https://www.youtube.com/watch?v=X0lgg_qKaqw",
                    target: '_blank'
                  }
                ]
              },
            ]
          }
        ]
      }
    },
  ];





  const div = document.createElement('div');

  const header = document.createElement('h2')
  header.innerText = studyLinks.name;
  div.id = studyLinks.name;
  div.appendChild(header);
  div.appendChild(document.createElement('br'));

  testComponent(
    studyLinks,
    testCases,
    div
  );

  document.getElementById('rendered-components').appendChild(div);
  document.getElementById('rendered-components').appendChild(document.createElement('hr'));

} catch (err) {
  console.log(err);
}

