const pairs = {
    'eurusd': { bid: 0, ask: 0, spread: 0 },
    'de40': { bid: 0, ask: 0, spread: 0 },
    'xauusd': { bid: 0, ask: 0, spread: 0 },
    'gbpusd': { bid: 0, ask: 0, spread: 0 },
    'usdjpy': { bid: 0, ask: 0, spread: 0 },
    'audusd': { bid: 0, ask: 0, spread: 0 },
  };

function updateUI(symbol, data) {
    let bid = data.b;
    let ask = data.a;
    let spread = data.bas;
  
    // check if html element exists before proceeding
    if (document.getElementById(symbol + 'bid') === null) return;
  
    document.getElementById(symbol + 'bid').innerHTML = bid;
    document.getElementById(symbol + 'ask').innerHTML = ask;
    document.getElementById(symbol + 'spread').innerHTML = spread;
  
    fontColor(data.b, pairs[symbol].bid, symbol + 'bid');
    fontColor(data.a, pairs[symbol].ask, symbol + 'ask');
    spreadBgColor(data.b, data.a, pairs[symbol].spread, symbol + 'spread');
  
    pairs[symbol].bid = data.b;
    pairs[symbol].ask = data.a;
    pairs[symbol].spread = data.b - data.a;
  }
  
  function fontColor(newValue, oldValue, elementId) {
    if (parseFloat(newValue) > parseFloat(oldValue)) {
      document.getElementById(elementId).className = 'text-success clickable';
    } else if (parseFloat(newValue) < parseFloat(oldValue)) {
      document.getElementById(elementId).className = 'text-danger clickable';
    }
  }
  
  function spreadBgColor(bid, ask, prevSpread, elementId) {
    if (prevSpread === -1) {
    } else if (parseFloat(prevSpread) > (parseFloat(bid) - parseFloat(ask))) {
      document.getElementById(elementId).className = 'text-light bg-success px-1';
    } else if (parseFloat(prevSpread) < (parseFloat(bid) - parseFloat(ask))) {
      document.getElementById(elementId).className = 'text-light bg-danger px-1';
    }
  }
  
  function initializeQuotes() {
    let vm = this;
    let container = document.getElementById('quotes');
  
    if (container === null) {
      return;
    }
  
    const connection = new signalR.HubConnectionBuilder()
      //.withUrl('https://marketing.d.tickmill.com/api/hub')
      .withUrl('https://marketing.tickmill.com/api/hub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Warning)
      .withAutomaticReconnect([0, 1000, 5000, 10000])
      .build();
  
    connection.on('connected', _ => {
      //console.log('Connected.');
    });
  
    connection.on('disconnected', _ => {
      //console.log('Disconnected, invalid token.');
    });
  
    //connection.on('update', (tick) => {
    //console.log('Update.');
    //console.log(tick);
    //});
  
    connection.on('snapshot', (ticks) => {
      //console.log('Snapshot.');
      //console.log(ticks);
  
      const json = JSON.parse(ticks);
  
      // check if pair is in the payload
      for (let key in pairs) {
        if (pairs.hasOwnProperty(key)) {
          let exists = false;
  
          for (let i = 0; i < json.length; i++) {
            if (json[i].hasOwnProperty('s')) {
              if (json[i].s === key.toUpperCase()) {
                exists = true;
                break;
              }
            }
          }
  
          if (!exists) {
            console.log(`${key.toUpperCase()} is not in the payload.`);
            delete pairs[key];
          }
        }
      }
  
      for (let i = 0; i < json.length; i++) {
        updateUI(json[i].s.toLowerCase(), json[i]);
      }
    });
  
    //console.log('Connecting to Tickmill Price Hub...');
  
    connection.start().then(() => {
      connection.invoke('initializeAsync', 'marketing');
    }).catch(err => console.log(err));
  
    window.onbeforeunload = () => {
      connection.stop();
    };
  }
  
  initializeQuotes();
  