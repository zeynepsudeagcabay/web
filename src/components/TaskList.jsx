import React from 'react';
import {Pencil,Trash2} from 'lucide-react';

export default function TaskList({tasks,toggleTask,onEdit,removeTask,empty='Bu ölçütlere uygun görev bulunamadı.'}){
  if(!tasks.length)return <div className="empty-state">{empty}</div>;
  return <div className="list">{tasks.map(t=><article className={'task '+(t.done?'done':'')} key={t.id}>
    <button className="check" onClick={()=>toggleTask(t.id)} aria-label={t.done?'Görevi yeniden aç':'Görevi tamamla'}>{t.done?'✓':''}</button>
    <div className="taskcopy"><h3>{t.title}</h3><p>{t.course} · {t.date}</p></div>
    <span className={'pill '+t.priority.toLocaleLowerCase('tr-TR')}>{t.priority}</span>
    {onEdit&&<button className="icon" onClick={()=>onEdit(t)} aria-label="Görevi düzenle"><Pencil size={17}/></button>}
    {removeTask&&<button className="icon danger" onClick={()=>removeTask(t.id)} aria-label="Görevi sil"><Trash2 size={17}/></button>}
  </article>)}</div>;
}
