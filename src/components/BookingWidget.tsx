import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const DAYS = ['日', '一', '二', '三', '四', '五', '六'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const isSameDate = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  
  const [activeTab, setActiveTab] = useState<'dates' | 'guests' | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const isUnavailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    // Mock booked dates
    if (date.getDate() === 15 || date.getDate() === 16 || date.getDate() === 22) return true;
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isUnavailable(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      // Check if there are unavailable dates between checkIn and date
      let current = new Date(checkIn);
      current.setDate(current.getDate() + 1);
      let hasUnavailable = false;
      while (current < date) {
        if (isUnavailable(current)) {
          hasUnavailable = true;
          break;
        }
        current.setDate(current.getDate() + 1);
      }
      
      if (hasUnavailable) {
        setCheckIn(date);
        setCheckOut(null);
      } else {
        setCheckOut(date);
        setActiveTab('guests');
      }
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const renderMonth = (date: Date, offset: number) => {
    const year = date.getFullYear();
    const month = date.getMonth() + offset;
    const displayDate = new Date(year, month, 1);
    const displayYear = displayDate.getFullYear();
    const displayMonth = displayDate.getMonth();
    
    const daysInMonth = getDaysInMonth(displayYear, displayMonth);
    const firstDay = getFirstDayOfMonth(displayYear, displayMonth);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(displayYear, displayMonth, i);
      const unavailable = isUnavailable(currentDay);
      const isCheckIn = isSameDate(currentDay, checkIn);
      const isCheckOut = isSameDate(currentDay, checkOut);
      
      let isBetween = false;
      if (checkIn && checkOut && currentDay > checkIn && currentDay < checkOut) {
        isBetween = true;
      } else if (checkIn && !checkOut && hoverDate && currentDay > checkIn && currentDay <= hoverDate) {
        isBetween = true;
      }

      days.push(
        <div key={i} className="relative w-10 h-10 flex items-center justify-center">
          {isBetween && <div className="absolute inset-0 bg-sky-100 -z-10"></div>}
          {isCheckIn && <div className="absolute inset-0 bg-sky-100 rounded-l-full -z-10"></div>}
          {isCheckOut && <div className="absolute inset-0 bg-sky-100 rounded-r-full -z-10"></div>}
          
          <button
            onClick={() => handleDateClick(currentDay)}
            onMouseEnter={() => !unavailable && setHoverDate(currentDay)}
            disabled={unavailable}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors
              ${unavailable ? 'text-stone-300 cursor-not-allowed line-through' : 'hover:bg-sky-100'}
              ${(isCheckIn || isCheckOut) ? 'bg-sky-900 text-white hover:bg-sky-800' : 'text-stone-700'}
            `}
          >
            {i}
          </button>
        </div>
      );
    }

    return (
      <div className="flex-1">
        <div className="text-center font-medium text-stone-800 mb-4">
          {displayYear}年 {MONTHS[displayMonth]}
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
          {DAYS.map(day => (
            <div key={day} className="text-xs text-stone-400 font-medium">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 place-items-center">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div ref={widgetRef} className="bg-white rounded-2xl shadow-2xl p-2 md:p-4 max-w-4xl mx-auto relative z-30 -mt-24 md:-mt-16 border border-stone-100">
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-100">
        
        {/* Dates Selector */}
        <div 
          className="flex-1 p-4 cursor-pointer hover:bg-stone-50 rounded-xl transition-colors"
          onClick={() => setActiveTab(activeTab === 'dates' ? null : 'dates')}
        >
          <div className="flex items-center gap-3 text-stone-500 mb-1">
            <CalendarIcon className="w-5 h-5 text-sky-700" />
            <span className="text-sm font-medium uppercase tracking-widest">入住 - 退房</span>
          </div>
          <div className="text-lg font-serif text-stone-800">
            {checkIn ? `${checkIn.getMonth() + 1}月${checkIn.getDate()}日` : '选择日期'} 
            {' - '}
            {checkOut ? `${checkOut.getMonth() + 1}月${checkOut.getDate()}日` : '选择日期'}
          </div>
        </div>

        {/* Guests Selector */}
        <div 
          className="flex-1 p-4 cursor-pointer hover:bg-stone-50 rounded-xl transition-colors"
          onClick={() => setActiveTab(activeTab === 'guests' ? null : 'guests')}
        >
          <div className="flex items-center gap-3 text-stone-500 mb-1">
            <Users className="w-5 h-5 text-sky-700" />
            <span className="text-sm font-medium uppercase tracking-widest">房客</span>
          </div>
          <div className="text-lg font-serif text-stone-800">
            {guests.adults} 位成人 {guests.children > 0 ? `, ${guests.children} 名儿童` : ''}
          </div>
        </div>

        {/* Book Button */}
        <div className="p-4 flex items-center justify-center">
          <button className="w-full md:w-auto px-8 py-4 bg-sky-900 text-white rounded-xl font-medium tracking-widest hover:bg-sky-800 transition-colors shadow-lg shadow-sky-900/20">
            查看空房
          </button>
        </div>
      </div>

      {/* Popovers */}
      <AnimatePresence>
        {activeTab === 'dates' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-4 bg-white rounded-2xl shadow-2xl border border-stone-100 p-6 w-full md:w-[700px] z-50"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <button onClick={prevMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors hidden md:block">
                <ChevronLeft className="w-5 h-5 text-stone-600" />
              </button>
              <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
                <div className="flex justify-between items-center md:hidden w-full mb-2">
                  <button onClick={prevMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5 text-stone-600" />
                  </button>
                  <button onClick={nextMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                    <ChevronRight className="w-5 h-5 text-stone-600" />
                  </button>
                </div>
                {renderMonth(currentDate, 0)}
                <div className="hidden md:block w-px bg-stone-100 mx-4"></div>
                <div className="hidden md:block flex-1">
                  {renderMonth(currentDate, 1)}
                </div>
              </div>
              <button onClick={nextMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors hidden md:block">
                <ChevronRight className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-stone-100">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-stone-300"></div>
                  <span className="text-stone-500">已满</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-900"></div>
                  <span className="text-stone-500">已选</span>
                </div>
              </div>
              <button 
                onClick={() => { setCheckIn(null); setCheckOut(null); }}
                className="text-sm text-stone-500 hover:text-stone-800 underline underline-offset-4"
              >
                清除日期
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'guests' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 md:left-1/2 mt-4 bg-white rounded-2xl shadow-2xl border border-stone-100 p-6 w-full md:w-80 z-50"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-stone-800">成人</div>
                  <div className="text-sm text-stone-500">13岁及以上</div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setGuests(g => ({ ...g, adults: Math.max(1, g.adults - 1) }))}
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-stone-400"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center font-medium">{guests.adults}</span>
                  <button 
                    onClick={() => setGuests(g => ({ ...g, adults: Math.min(10, g.adults + 1) }))}
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-stone-400"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-stone-800">儿童</div>
                  <div className="text-sm text-stone-500">2-12岁</div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setGuests(g => ({ ...g, children: Math.max(0, g.children - 1) }))}
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-stone-400"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center font-medium">{guests.children}</span>
                  <button 
                    onClick={() => setGuests(g => ({ ...g, children: Math.min(10, g.children + 1) }))}
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-stone-400"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
