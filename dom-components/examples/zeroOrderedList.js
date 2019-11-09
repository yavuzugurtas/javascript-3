try {

  function zeroOrderedList(arr) {
    const olElement = document.createElement('ol');
    olElement.start = 0;
    arr.forEach(item => {
      const liElement = document.createElement('li');
      liElement.innerText = item;
      olElement.appendChild(liElement);
    });
    return olElement;
  }


  testComponent.attributesToTest = [
    'nodeName', 'childElementCount', 'children', 'innerText', 'start'
  ];

  const testCases = [
    {
      name: 'first',
      args: [['e', 'f', 'g']],
      expected: {
        nodeName: 'OL',
        start: 0,
        childElementCount: 3,
        children: [
          { nodeName: 'LI', innerText: 'e' },
          { nodeName: 'LI', innerText: 'f' },
          { nodeName: 'LI', innerText: 'g' },
        ]
      }
    },
    {
      name: 'second',
      args: [['a', 'b', 'c', 'g']],
      expected: {
        nodeName: 'OL',
        start: 0,
        childElementCount: 4,
        children: [
          { nodeName: 'LI', innerText: 'a' },
          { nodeName: 'LI', innerText: 'b' },
          { nodeName: 'LI', innerText: 'c' },
          { nodeName: 'LI', innerText: 'g' },
        ]
      }
    },
    {
      name: 'third',
      args: [[3, 'b']],
      expected: {
        nodeName: 'OL',
        start: 0,
        childElementCount: 2,
        children: [
          { nodeName: 'LI', innerText: '3' },
          { nodeName: 'LI', innerText: 'b' },
        ]
      }
    }
  ];



  const div = document.createElement('div');

  const header = document.createElement('h2')
  header.innerText = zeroOrderedList.name;
  div.id = zeroOrderedList.name;
  div.appendChild(header);
  div.appendChild(document.createElement('br'));

  testComponent(
    zeroOrderedList,
    testCases,
    div
  );

  document.getElementById('rendered-components').appendChild(document.createElement('hr'));
  document.getElementById('rendered-components').appendChild(div);

} catch (err) {
  console.log(err);
}
