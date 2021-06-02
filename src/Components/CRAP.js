const NavigationBar = () => {
    return (
        <ul className='ulStyle'>
            <li onClick={()=>this.props.onRouteChange('/')} href="#0">{'Home'}</li>
            <li onClick={()=>this.props.onRouteChange('/About')}>{'About'}</li>
            <li onClick={()=>this.props.onRouteChange('/Products')}>{'Products'}</li>
            <li onClick={()=>this.prpps.onRouteChange('/Contacts')} className='floatRight'>{'Contacts'}</li>
        </ul>
    )
}}



from app
{/* </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > 
          Learn React
        </a>
      </header>
    </div> */}



create-react-dom
<div>
    <h2>{`Current route is: ${'five'}`}</h2>
    <ul>
        <li>
            <link to='/'>{'Home'}</link>
        </li>
        <li>
            <link to='/About'>{'About'}</link>
        </li>
        <li>
            <link to='/Products'>{'Products'}</link>
        </li>
        <li>
            <link to='/Contacts'>{'Contacts'}</link>
        </li>
    </ul>
</div>


{
    this.state.route === 'About'
        ? <About onRouteChange={this.onRouteChange} />
        : <Products />
}