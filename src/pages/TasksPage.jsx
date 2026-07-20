import React,{useMemo,useState} from 'react';
import {Search} from 'lucide-react';
import TaskList from '../components/TaskList';
import TaskForm,{emptyForm} from '../components/TaskForm';

export default function TasksPage({tasks,setTasks,courses,toggleTask,removeTask}){
  const[q,setQ]=useState('');
  const[filter,setFilter]=useState('all');
  const[editing,setEditing]=useState(null);
  const[form,setForm]=useState({...emptyForm,course:courses[0]?.name||''});
  const visible=useMemo(()=>tasks.filter(t=>{
    const matches=(t.title+' '+t.course).toLocaleLowerCase('tr-TR').includes(q.toLocaleLowerCase('tr-TR'));
    return matches&&(filter==='all'||(filter==='done'?t.done:!t.done));
  }),[tasks,q,filter]);
  const save=e=>{
    e.preventDefault();
    if(editing)setTasks(tasks.map(t=>t.id===editing?{...t,...form}:t));
    else setTasks([{id:Date.now(),...form,done:false},...tasks]);
    setEditing(null);setForm({...emptyForm,course:courses[0]?.name||''});
  };
  const edit=t=>{setEditing(t.id);setForm({title:t.title,course:t.course,date:t.date,priority:t.priority})};
  const cancel=()=>{setEditing(null);setForm({...emptyForm,course:courses[0]?.name||''})};
  return <div className="grid">
    <div className="tasks">
      <div className="toolbar"><div><h2>Görev listesi</h2><span>{visible.length} görev görüntüleniyor</span></div><label className="search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Görev ara"/></label></div>
      <div className="filters">
        <button className={filter==='all'?'selected':''} onClick={()=>setFilter('all')}>Tümü</button>
        <button className={filter==='open'?'selected':''} onClick={()=>setFilter('open')}>Bekleyen</button>
        <button className={filter==='done'?'selected':''} onClick={()=>setFilter('done')}>Tamamlanan</button>
        {(q||filter!=='all')&&<button className="clear-filter" onClick={()=>{setQ('');setFilter('all')}}>Filtreleri temizle</button>}
      </div>
      <TaskList tasks={visible} toggleTask={toggleTask} onEdit={edit} removeTask={removeTask}/>
    </div>
    <TaskForm form={form} setForm={setForm} editing={editing} onSave={save} onCancel={cancel} courses={courses}/>
  </div>;
}
