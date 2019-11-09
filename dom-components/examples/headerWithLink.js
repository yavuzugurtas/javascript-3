try {

  function headerWithLink(obj) {
    const h2El = document.createElement('h2');
    h2El.innerText = obj.title;
    h2El.className = 'red';

    const buttonEl = document.createElement('button');
    buttonEl.innerText = 'learn about ' + obj.text;

    const aEl = document.createElement('a');
    aEl.href = obj.link;
    aEl.target = "_blank";
    aEl.appendChild(buttonEl)

    const divEl = document.createElement('div');
    divEl.appendChild(h2El);
    divEl.appendChild(aEl);

    return divEl;
  }

  testComponent.attributesToTest = [
    'nodeName', 'innerText', 'target', 'children', "childElementCount", "href", 'className'
  ];

  const testCases = [
    {
      name: 'first',
      args: [{
        title: 'so popular',
        text: "cats",
        link: "https://thecatsite.com/"
      }],
      expected: {
        nodeName: 'DIV',
        childElementCount: 2,
        children: [
          {
            nodeName: "H2",
            innerText: "so popular",
            childElementCount: 0,
            className: 'red',
          },
          {
            nodeName: 'A',
            childElementCount: 1,
            target: "_blank",
            href: "https://thecatsite.com/",
            children: [
              {
                nodeName: 'BUTTON',
                innerText: "learn about cats",
              }
            ]
          },
        ]
      }
    },
    {
      name: 'second',
      args: [{
        title: 'so funny',
        text: "goats",
        link: "https://www.goat.com/"
      }],
      expected: {
        nodeName: 'DIV',
        childElementCount: 2,
        children: [
          {
            nodeName: "H2",
            innerText: "so funny",
            childElementCount: 0,
            className: 'red',
          },
          {
            nodeName: 'A',
            childElementCount: 1,
            target: "_blank",
            href: "https://www.goat.com/",
            children: [
              {
                nodeName: 'BUTTON',
                innerText: "learn about goats",
              }
            ]
          },
        ]
      }
    },
    {
      name: 'third',
      args: [{
        title: 'so dancey',
        text: "badgers",
        link: "https://www.badgerbadgerbadger.com/"
      }],
      expected: {
        nodeName: 'DIV',
        childElementCount: 2,
        children: [
          {
            nodeName: "H2",
            innerText: "so dancey",
            childElementCount: 0,
            className: 'red',
          },
          {
            nodeName: 'A',
            childElementCount: 1,
            target: "_blank",
            href: "https://www.badgerbadgerbadger.com/",
            children: [
              {
                nodeName: 'BUTTON',
                innerText: "learn about badgers",
              }
            ]
          },
        ]
      }
    },
  ];



  const div = document.createElement('div');

  const header = document.createElement('h2')
  header.innerText = headerWithLink.name;
  div.id = headerWithLink.name;
  div.appendChild(header);
  div.appendChild(document.createElement('br'));

  testComponent(
    headerWithLink,
    testCases,
    div
  );

  document.getElementById('rendered-components').appendChild(document.createElement('hr'));
  document.getElementById('rendered-components').appendChild(div);

} catch (err) {
  console.log(err);
}

