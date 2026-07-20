import React,{useMemo,useState} from 'react';
import {Plus,X} from 'lucide-react';
import TaskList from '../components/TaskList';

export default function CoursesPage({tasks,courses,setCourses,toggleTask,goToTasks}){
  const[selected,setSelected]=useState(courses[0]?.name||'');
  const[adding,setAdding]=useState(false);
  const[name,setName]=useState('');
  const selectedTasks=useMemo(()=>tasks.filter(t=>t.course===selected),[tasks,selected]);
  const addCourse=e=>{e.preventDefault();const clean=name.trim();if(!clean)return;const colors=['#5b4bea','#10a77a','#e79332','#d65373','#2f7bd8'];setCourses([...courses,{id:Date.now(),name:clean,color:colors[courses.length%colors.length]}]);setSelected(clean);setName('');setAdding(false)};
  return <div className="courses-layout">
    <section className="courses-card">
      <div className="section-title"><div><h2>Derslerim</h2><span>{courses.length} aktif ders</span></div><button className="primary-small" onClick={()=>setAdding(true)}><Plus size={17}/>Yeni ders</button></div>
      {adding&&<form className="inline-form" onSubmit={addCourse}><label>Ders adı<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Örn. Algoritma Analizi"/></label><button className="submit">Dersi ekle</button><button type="button" className="icon" onClick={()=>setAdding(false)} aria-label="Formu kapat"><X/></button></form>}
      <div className="course-grid">{courses.map(c=>{const all=tasks.filter(t=>t.course===c.name),done=all.filter(t=>t.done).length,pct=all.length?Math.round(done/all.length*100):0;return <button key={c.id} className={'course-card '+(selected===c.name?'selected':'')} onClick={()=>setSelected(c.name)}><span className="course-icon" style={{background:c.color}}>{c.name.slice(0,2).toUpperCase()}</span><h3>{c.name}</h3><p>{done}/{all.length} görev tamamlandı</p><div className="progress"><i style={{width:`${pct}%`,background:c.color}}/></div><b>{pct}%</b></button>})}</div>
    </section>
    <section className="course-detail">
      <div className="panel-heading"><div><span>Seçili ders</span><h2>{selected||'Ders seç'}</h2></div><button className="secondary-small" onClick={goToTasks}>Görevleri yönet</button></div>
      <TaskList tasks={selectedTasks} toggleTask={toggleTask} empty="Bu derse henüz görev eklenmemiş."/>
    </section>
  </div>;
}
