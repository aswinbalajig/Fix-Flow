import React from 'react';

export default function TicketItem({ticket,dispatch})
{   console.log(`ticket ${ticket.id}:${ticket}`)
    const {title,description,id,priority}=ticket;
    const priorityClasses={
        1:'priority-low',
        2:'priority-medium',
        3:'priority-high'
    };
    return (
        <div className='ticket-item'>
            <div className={`priority-dot ${priorityClasses[priority]}`}></div>
            <h3>{title}</h3>
            <p>{description}</p>
            <button className='button' onClick={()=>dispatch({type:'DELETE_TICKET',payload:{id}})}>Delete</button>
            <button className='button' onClick={()=>{dispatch({type:'SET_EDITING_TICKET',payload:ticket});
                                                            window.scrollTo(0,0);}}>Edit</button>

</div>
    );
}