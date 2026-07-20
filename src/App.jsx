import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,CalendarDays,CheckCircle2,Clock3,GraduationCap,ListTodo} from 'lucide-react';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import CoursesPage from './pages/CoursesPage';

const initialTasks=[
  {id:1,title:'Makine Öğrenmesi tekrarı',course:'Makine Öğrenmesi',date:'2026-07-20',priority:'Yüksek',done:false},
  {id:2,title:'Fizik 2 soru çözümü',course:'Fizik 2',date:'2026-07-20',priority:'Orta',done:true},
  {id:3,title:'SQL proje raporu',course:'Veritabanı',date:'2026-07-21',priority:'Yüksek',done:false},
  {id:4,title:'Olasılık konu özeti',course:'Olasılık ve İstatistik',date:'2026-07-23',priority:'Düşük',done:false},
  {id:5,title:'React component tekrarı',course:'Web Programlama',date:'2026-07-25',priority:'Orta',done:false}
];
const initialCourses=[
  {id:1,name:'Makine Öğrenmesi',color:'#5b4bea'},
  {id:2,name:'Fizik 2',color:'#10a77a'},
  {id:3,name:'Veritabanı',color:'#e79332'},
  {id:4,name:'Olasılık ve İstatistik',color:'#d65373'},
  {id:5,name:'Web Programlama',color:'#2f7bd8'}
];
const pageInfo={
  tasks:['Görevlerim','Günlük çalışmalarını planla ve ilerlemeni takip et.'],
  calendar:['Takvim','Görevlerini tarihlere göre görüntüle.'],
  courses:['Dersler','Derslerini ve tamamlanma oranlarını yönet.']
};

export default function App(){
  const[page,setPage]=useState('tasks');
  const[tasks,setTasks]=useState(()=>JSON.parse(localStorage.getItem('focusflow_tasks')||'null')||initialTasks);
  const[courses,setCourses]=useState(()=>JSON.parse(localStorage.getItem('focusflow_courses')||'null')||initialCourses);
  useEffect(()=>localStorage.setItem('focusflow_tasks',JSON.stringify(tasks)),[tasks]);
  useEffect(()=>localStorage.setItem('focusflow_courses',JSON.stringify(courses)),[courses]);
  const stats=useMemo(()=>({
    done:tasks.filter(t=>t.done).length,
    open:tasks.filter(t=>!t.done).length,
    courses:courses.length
  }),[tasks,courses]);
  const toggleTask=id=>setTasks(tasks.map(t=>t.id===id?{...t,done:!t.done}:t));
  const removeTask=id=>setTasks(tasks.filter(t=>t.id!==id));
  const[title,subtitle]=pageInfo[page];
  const nav=[
    {id:'tasks',label:'Görevlerim',icon:ListTodo},
    {id:'calendar',label:'Takvim',icon:CalendarDays},
    {id:'courses',label:'Dersler',icon:GraduationCap}
  ];
  return <main className="app-shell">
    <aside>
      <button className="brand" onClick={()=>setPage('tasks')} aria-label="Görevlerim sayfasına git"><span>F</span>FocusFlow</button>
      <nav>{nav.map(item=>{const Icon=item.icon;return <button key={item.id} className={page===item.id?'active':''} onClick={()=>setPage(item.id)}><Icon size={18}/>{item.label}</button>})}</nav>
      <div className="aside-progress"><b>Haftalık hedef</b><span>{stats.done} görev tamamlandı</span><div><i style={{width:`${Math.min(100,stats.done/5*100)}%`}}/></div></div>
      <p className="aside-note">Bugünün küçük adımları, yarının büyük ilerlemesi.</p>
    </aside>
    <section className="page">
      <header><div><p>20 Temmuz 2026</p><h1>{title}</h1><span>{subtitle}</span></div><div className="avatar" title="Zeynep Sude">ZS</div></header>
      <div className="stats">
        <article><CheckCircle2/><div><b>{stats.done}</b><span>Tamamlanan</span></div></article>
        <article><Clock3/><div><b>{stats.open}</b><span>Bekleyen</span></div></article>
        <article><BookOpen/><div><b>{stats.courses}</b><span>Aktif ders</span></div></article>
      </div>
      {page==='tasks'&&<TasksPage tasks={tasks} setTasks={setTasks} courses={courses} toggleTask={toggleTask} removeTask={removeTask}/>}
      {page==='calendar'&&<CalendarPage tasks={tasks} toggleTask={toggleTask}/>}
      {page==='courses'&&<CoursesPage tasks={tasks} courses={courses} setCourses={setCourses} toggleTask={toggleTask} goToTasks={()=>setPage('tasks')}/>}
    </section>
  </main>;
}
