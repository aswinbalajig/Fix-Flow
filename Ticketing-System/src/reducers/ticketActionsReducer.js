export default function ticketActionsReducer(state,action)
{
    switch(action.type){
        case 'ADD_TICKET':
        // returning the current state , as states are immutable we creating new one with 
        //state's previous values of other key value pair plus the new tickets key and its value    
        return{...state,tickets:[...state.tickets,action.payload]};
        case 'DELETE_TICKET':
            if (state.editingTicket && state.editingTicket.id===action.payload.id){
                return {...state,tickets:state.tickets.filter((ticket)=>ticket.id!=action.payload.id),editingTicket:null};
            }
            else{
                return {...state,tickets:state.tickets.filter((ticket)=>ticket.id!=action.payload.id)};
            }
        
        case 'UPDATE_TICKET':
            //using map function to find which ticket has the id which is need to be updated and changes the value 
            //with updated value
            return {...state,tickets:state.tickets.map(
                (ticket)=>{
                    if (ticket.id===action.payload.id){
                        return action.payload;
                    }
                    else{
                        return ticket;
                    }
                }
            )}
        
        case "SET_EDITING_TICKET":
            return {...state,editingTicket:action.payload};
        
        case "CLEAR_EDITING_TICKET":
            return {...state,editingTicket:null};
        
        case "SET_SORTING":
            return{
                ...state,sortPreference:action.payload
            };
        default:
            return state;

        }
}