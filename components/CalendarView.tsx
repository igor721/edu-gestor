import React from 'react';
import { MOCK_EVENTS } from '../constants';

export const CalendarView: React.FC = () => {
  const currentDate = new Date();
  
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  const daysInMonth: Date[] = [];
  const tempDate = new Date(monthStart);
  while (tempDate <= monthEnd) {
    daysInMonth.push(new Date(tempDate));
    tempDate.setDate(tempDate.getDate() + 1);
  }

  const getEventsForDay = (date: Date) => {
    return MOCK_EVENTS.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const formattedMonth = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Calendário Acadêmico - <span className="text-indigo-600 capitalize">{formattedMonth}</span>
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-400 text-sm uppercase">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4">
          {/* Fill empty days at start if needed */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
             <div key={`empty-${i}`} />
          ))}

          {daysInMonth.map((day) => {
            const events = getEventsForDay(day);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-[120px] p-3 rounded-lg border ${
                  isCurrentDay ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 bg-white hover:border-gray-300'
                } transition-all`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-medium ${isCurrentDay ? 'text-indigo-700' : 'text-gray-700'}`}>
                    {day.getDate()}
                  </span>
                </div>
                <div className="space-y-1">
                  {events.map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1.5 rounded border-l-2 truncate ${
                        event.type === 'exam' ? 'bg-red-50 border-red-500 text-red-700' :
                        event.type === 'holiday' ? 'bg-green-50 border-green-500 text-green-700' :
                        'bg-blue-50 border-blue-500 text-blue-700'
                      }`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex gap-4 text-sm text-gray-600 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Acadêmico</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Provas</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Feriados</div>
      </div>
    </div>
  );
};