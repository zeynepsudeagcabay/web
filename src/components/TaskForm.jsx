import React from 'react';
import {Plus} from 'lucide-react';

export const emptyForm={title:'',course:'Makine Öğrenmesi',date:'2026-07-20',priority:'Orta'};

export default function TaskForm({form,setForm,editing,onSave,onCancel,courses}){
  return <form onSubmit={onSave}>
    <div className="formtitle"><Plus/><div><h2>{editing?'Görevi güncelle':'Yeni görev'}</h2><span>Planına yeni bir adım ekle.</span></div></div>
    <label>Görev adı<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Örn. Algoritma tekrarı"/></label>
    <label>Ders<select value={form.course} onChange={e=>setForm({...form,course:e.target.value})}>{courses.map(c=><option key={c.id}>{c.name}</option>)}</select></label>
    <label>Tarih<input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label>
    <label>Öncelik<select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Düşük</option><option>Orta</option><option>Yüksek</option></select></label>
    <button className="submit">{editing?'Değişiklikleri kaydet':'Görev ekle'}</button>
    {editing&&<button type="button" className="cancel" onClick={onCancel}>Vazgeç</button>}
  </form>;
}
