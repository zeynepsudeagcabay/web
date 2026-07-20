import React,{useMemo,useState} from 'react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import TaskList from '../components/TaskList';

const months=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const pad=n=>String(n).padStart(2,'0');
const iso=(y,m,d)=>`${y}-${pad(m+1)}-${pad(d)}`;

export default function CalendarPage({tasks,toggleTask}){
  const[view,setView]=useState(new Date(2026,6,1));
  const[selected,setSelected]=useState('2026-07-20');
  const year=view.getFullYear(),month=view.getMonth();
  const first=(new Date(year,month,1).getDay()+6)%7;
  const count=new Date(year,month+1,0).getDate();
  const cells=[...Array(first).fill(null),...Array.from({length:count},(_,i)=>i+1)];
  const selectedTasks=useMemo(()=>tasks.filter(t=>t.date===selected),[tasks,selected]);
  const move=delta=>setView(new Date(year,month+delta,1));
  const today=()=>{setView(new Date(2026,6,1));setSelected('2026-07-20')};
  return <div className="calendar-layout">
    <section className="calendar-card">
      <div className="calendar-head"><div><h2>{months[month]} {year}</h2><span>Bir güne tıklayarak görevlerini görüntüle.</span></div><div className="calendar-actions"><button onClick={()=>move(-1)} aria-label="Önceki ay"><ChevronLeft/></button><button onClick={today}>Bugün</button><button onClick={()=>move(1)} aria-label="Sonraki ay"><ChevronRight/></button></div></div>
      <div className="weekdays">{['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'].map(x=><b key={x}>{x}</b>)}</div>
      <div className="calendar-grid">{cells.map((day,i)=>day?<button key={i} className={(selected===iso(year,month,day)?'selected ':'')+(iso(year,month,day)==='2026-07-20'?'today':'')} onClick={()=>setSelected(iso(year,month,day))}><span>{day}</span><div>{tasks.filter(t=>t.date===iso(year,month,day)).slice(0,3).map(t=><i key={t.id} title={t.title}/>)}</div></button>:<div key={i}/>)}</div>
    </section>
    <section className="day-panel"><div className="panel-heading"><h2>Seçilen gün</h2><b>{selected.split('-').reverse().join('.')}</b></div><TaskList tasks={selectedTasks} toggleTask={toggleTask} empty="Bu gün için planlanmış görev yok."/></section>
  </div>;
}
