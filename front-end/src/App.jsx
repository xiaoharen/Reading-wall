function App() {
  function testPhp() {
    let url = 'http://localhost:3001/';
    fetch(url, {
      method: 'get',
      // credentials: 'include',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json'
      // },
      // body: JSON.stringify(searchRequest)
    })
      // .then(data => console.log(data.data))
      .then(data => data.json())
      .then(data => {
        console.log(data);
      })
      .catch(e => console.log('error:', e));
  }

  return (
    <>
      {testPhp()}
    </>
  )
}

export default App
