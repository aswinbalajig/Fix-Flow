import { useState ,useReducer} from 'react';
import './styles.css';
import './App.css';
import TicketForm from './components/TicketForm';
import Ticketlist from './components/Ticketlist';
import ticketActionsReducer from './reducers/ticketActionsReducer';
import { sortTickets } from './utilities/sortingUtilities';
function App() {
  const initialState={
    tickets:[],
    editingTicket:null,
    sortPreference:"High to Low"
  };
  const [state,dispatch]=useReducer(ticketActionsReducer,initialState);
  const sortedTickets=sortTickets(state.tickets,state.sortPreference);//sort the tickets based on sortpreference then display it
  return (
    <div className="App">
      <div className="container">
        <h1>FixFlow</h1>
        <TicketForm editingTicket={state.editingTicket} dispatch={dispatch}></TicketForm>
        {state.tickets.length > 0 ? (
          <div className='results'>
            <h2>All titles</h2>
            <select
              value={state.sortPreference}
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
            <Ticketlist
              dispatch={dispatch}
              tickets={sortedTickets}
            ></Ticketlist>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App
