import React,{useEffect, useState} from 'react'

export default function TicketForm({dispatch,editingTicket})
{   const [title,setTitle]= useState('');
    const [description,setDescription]=useState('');
    const [priority,setPriority]=useState(1);



    useEffect(()=>{
        if(editingTicket)
        {
            setTitle(editingTicket.title);
            setDescription(editingTicket.description);
            setPriority(editingTicket.priority);
        }
        else{
            onSubmitClearForm();
        }
    },[editingTicket])





    const priorityLable={
        1:'Low',2:'Medium',3:'High'
    }
    
    function onSubmitClearForm(){
        setTitle('');
        setDescription('');
        setPriority(1);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const ticketData={
            id: editingTicket?editingTicket.id:crypto.randomUUID() ,title,description,priority
        }
        dispatch({
            type:editingTicket?'UPDATE_TICKET':'ADD_TICKET',
            payload:ticketData
        });
        onSubmitClearForm();
        dispatch({type:"CLEAR_EDITING_TICKET"});
        window.scrollTo(0, document.body.scrollHeight);
        console.log(ticketData);
    };

   
    return(
        <form onSubmit={(e)=>handleSubmit(e)} className='ticket-form'>
            <div>
                <label>Title</label>
                <input type="text" className='form-input' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
            <div>
                <label>Description</label>
                <textarea type="text" className='form-input' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>
            <fieldset className='priority-fieldset'>
                <legend>Priority</legend>
                {
                    Object.entries(priorityLable).map(([value,label])=>{
                        return (<label key={value} className='priority-label'>
                            <input type="radio" value={value} checked={priority===value} className='priority-input' onChange={(e)=>setPriority(e.target.value)}></input>{label}
                        </label>)
                    })
                }
            </fieldset>
            <button type="submit" className='button'>Submit</button>

        </form>
    );
}
