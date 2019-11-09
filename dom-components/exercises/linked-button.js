try {

  function linkedButton(arr) {
    // write me! (after studying some examples ;)
  }


  testComponent.attributesToTest = [
    'nodeName', 'innerText', 'target', "childElementCount", "href", 'children'
  ];

  const testCases = [
    {
      name: 'first',
      args: [[
        "cats",
        "https://thecatsite.com/"
      ]],
      expected: {
        nodeName: 'A',
        childElementCount: 1,
        target: "_blank",
        href: "https://thecatsite.com/",
        children: [
          {
            nodeName: 'BUTTON',
            innerText: 'learn about cats'
          }
        ]
      }
    },
    {
      name: 'second',
      args: [[
        "goats",
        "https://www.goat.com/"
      ]],
      expected: {
        nodeName: 'A',
        childElementCount: 1,
        target: "_blank",
        href: "https://www.goat.com/",
        children: [
          {
            nodeName: 'BUTTON',
            innerText: 'learn about goats'
          }
        ]
      }
    },
    {
      name: 'third',
      args: [[
        "badgers",
        "https://www.badgerbadgerbadger.com/"
      ]],
      expected: {
        nodeName: 'A',
        childElementCount: 1,
        target: "_blank",
        href: "https://www.badgerbadgerbadger.com/",
        children: [
          {
            nodeName: 'BUTTON',
            innerText: 'learn about badgers'
          }
        ]
      }
    },
  ];



  const div = document.createElement('div');

  const header = document.createElement('h2')
  header.innerText = linkedButton.name;
  div.id = linkedButton.name;
  div.appendChild(header);
  div.appendChild(document.createElement('br'));

  testComponent(
    linkedButton,
    testCases,
    div
  );

  document.getElementById('rendered-components').appendChild(div);
  document.getElementById('rendered-components').appendChild(document.createElement('hr'));

} catch (err) {
  console.log(err);
}

