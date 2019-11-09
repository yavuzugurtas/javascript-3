try {

  function simpleHyperlink(obj) {
    const aElement = document.createElement('a');
    aElement.innerText = 'learn about ' + obj.text;
    aElement.href = obj.link;
    aElement.target = "_blank";
    return aElement;
  }

  testComponent.attributesToTest = [
    'nodeName', 'innerText', 'target', "childElementCount", "href"
  ];

  const testCases = [
    {
      name: 'first',
      args: [{
        text: "cats",
        link: "https://thecatsite.com/"
      }],
      expected: {
        innerText: "learn about cats",
        nodeName: 'A',
        childElementCount: 0,
        target: "_blank",
        href: "https://thecatsite.com/"
      }
    },
    {
      name: 'second',
      args: [{
        text: "goats",
        link: "https://www.goat.com/"
      }],
      expected: {
        innerText: "learn about goats",
        nodeName: 'A',
        childElementCount: 0,
        target: "_blank",
        href: "https://www.goat.com/"
      }
    },
    {
      name: 'third',
      args: [{
        text: "badgers",
        link: "https://www.badgerbadgerbadger.com/"
      }],
      expected: {
        innerText: "learn about badgers",
        nodeName: 'A',
        childElementCount: 0,
        target: "_blank",
        href: "https://www.badgerbadgerbadger.com/"
      }
    },
  ];

  const div = document.createElement('div');

  const header = document.createElement('h2')
  header.innerText = simpleHyperlink.name;
  div.id = simpleHyperlink.name;
  div.appendChild(header);
  div.appendChild(document.createElement('br'));

  testComponent(
    simpleHyperlink,
    testCases,
    div
  );

  document.getElementById('rendered-components').appendChild(document.createElement('hr'));
  document.getElementById('rendered-components').appendChild(div);

} catch (err) {
  console.log(err);
}
