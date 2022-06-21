import React, {useState} from 'react'

function Exercise2() {
    
    const [fnam, setFnam] = useState('');
    const [lnam , setLnam] = useState('');
    const [items, setItems] = useState([]);
    const [items1, setItems1] = useState([]);
    const [togleSubmit, setTogleSubmit] = useState(true)
    const [isEditFnam, setIsEditFnam] = useState(null)
    const [isEditLnam, setIsEditLnam] = useState(null)

    const addItem = (e) =>{
        if((!fnam) || (!lnam)) {
            alert('please enter Firstname & lastname')
        }
        else if((fnam && lnam) && !togleSubmit){  //for editing
            //for fnam
            setItems(
                items.map((ele)=>{
                    if(ele.id==isEditFnam){
                        return { ...ele, name: fnam}
                    }
                    return ele
                })
            )

            // for lnam
            setItems1(
                items1.map((ele)=>{
                    if(ele.id==isEditLnam){
                        return { ...ele, name: lnam}
                    }
                    return ele
                })
            )
            
            setTogleSubmit(true)
            setFnam('')
            setIsEditFnam(null)
            setLnam('')
            setIsEditLnam(null)
        }

        else{   //to add items
            const allFnam = {id: new Date().getTime().toString(), name: fnam}
            
            const allLnam = {id: new Date().getTime().toString(), name: lnam}
            setItems([...items, allFnam])      
            setItems1([...items1, allLnam])
            setFnam(' ')
            setLnam(' ')
        }
        e.preventDefault()
    }

    const editItem = (id) => {
        // for fnam:
        let newEditFnam = items.find((ele)=>{
            return ele.id===id
        });
        console.log(newEditFnam)
        setTogleSubmit(false)
        setFnam(newEditFnam.name)
        setIsEditFnam(id)

        // for lnam:
        let newEditLnam = items1.find((ele)=>{
            return ele.id===id
        });
        console.log(newEditLnam)
        setTogleSubmit(false)
        setLnam(newEditLnam.name)
        setIsEditLnam(id)
    }

    const delItem = (index) =>{
        const updatedItem = items.filter((ele)=> {
            return index !==ele.id
        })
        const updatedItem1 = items1.filter((ele)=> {
            return index !==ele.id
        })
        setItems(updatedItem)
        setItems1(updatedItem1)
    }
    return (
        <div className="container mt-5">
            <div className="addItems">
            <form className="form-inline">
        <div className="row">
            <div className="col-5">
            <input className="form-control" type="text" placeholder="Enter FirstName" value={fnam} onChange={(e) => setFnam(e.target.value) }/>
            </div>

            <div className="col-5">
            <input className="form-control" type="text" placeholder="Enter LastName" value={lnam} onChange={(e) => setLnam(e.target.value)}/>
            </div>

            <div className="col-2">
            {
                togleSubmit ?
            <button type="submit" className="btn btn-outline-secondary" value="add" onClick={addItem}>
                <i className="fa fa-plus-square m-2"></i>ADD</button> 
            : 
            <button className="btn btn-outline-secondary" onClick={addItem}>
                    <i className="fa fa-pencil m-2"></i>EDIT</button>
            }
            </div>
            </div>
            </form>
        </div>
        <br/><br/>
        <div className="showItems">
        <div>
            <table align="center" className="table table-sm table-striped table-bordered">
                <thead>
            <tr>
                <td className="col-4">
                {
                     items.map((ele) =>{
                        return(
                            <div key={ele.id}>
                        <p>{ele.name}</p>
                        </div>
                        )
                    })
                }
                </td>

                <td className="col-4">
                {
                    items1.map((ele)  =>{
                        return(
                            <div key={ele.id}>
                        <p>{ele.name}</p>
                        </div>
                        )
                    })
                }
                </td>

                <td>
                {
                    items1.map((ele)  =>{
                        return(
                            <div key={ele.id}>
                        <span>  
                        <button className="btn btn-outline-secondary" onClick={() => editItem(ele.id)}>
                    <i className="fa fa-pencil m-2"></i>EDIT</button>
                        <button onClick={()=>delItem(ele.id)} className="btn btn-outline-secondary" >
                    <i className="fa fa-trash m-2"></i>DELETE</button>
                        </span>
                        </div>
                        )
                    })
                }
                </td>
            </tr>
            </thead>
            </table>
               
        </div>
        </div>

        </div>
    )
}

export default Exercise2
