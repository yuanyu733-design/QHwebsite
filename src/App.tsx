/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { Anchor, Coffee, Compass, MapPin, Phone, Star, Sun, Waves, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';
import BookingWidget from './components/BookingWidget';

const Seagull = ({ className, delay = 0, duration = 15, yOffset = 0 }: { className?: string, delay?: number, duration?: number, yOffset?: number }) => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute z-20 pointer-events-none ${className}`}
    initial={{ x: '-10vw', y: yOffset, opacity: 0, scale: 0.5 }}
    animate={{ 
      x: '110vw', 
      y: [yOffset, yOffset - 30, yOffset + 10, yOffset - 20, yOffset], 
      opacity: [0, 0.8, 0.8, 0],
      scale: [0.5, 1, 0.8, 0.5]
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <path 
      d="M10 50 Q 25 30 50 50 Q 75 30 90 50 Q 75 40 50 60 Q 25 40 10 50 Z" 
      fill="white" 
      opacity="0.9"
    />
  </motion.svg>
);

const AnimatedWaves = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 h-[100px] md:h-[150px]">
      <svg className="relative block w-[200%] h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <motion.path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          className="fill-white/20"
          animate={{ x: [0, -600] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        />
        <motion.path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-23.6V0Z"
          className="fill-white/40"
          animate={{ x: [0, -600] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.path
          d="M1200,120H0V71.45C0,71.45,154,19.5,338,45.5S654,115.5,868,71.45,1200,71.45,1200,71.45Z"
          className="fill-[#fafaf9]"
          animate={{ x: [0, -600] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
        <motion.path
          d="M1200,120H0V71.45C0,71.45,154,19.5,338,45.5S654,115.5,868,71.45,1200,71.45,1200,71.45Z"
          className="fill-[#fafaf9]"
          initial={{ x: 600 }}
          animate={{ x: [600, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`font-serif text-2xl font-bold tracking-wider transition-colors duration-500 ${isScrolled ? 'text-sky-900' : 'text-white text-shadow-md'}`}>
            栖海 <span className="text-sm font-sans font-normal tracking-widest uppercase ml-2 opacity-80">Azure Haven</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['关于我们', '客房', '体验', '画廊'].map((item) => (
              <a key={item} href={`#${item}`} className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-sky-400 ${isScrolled ? 'text-stone-600' : 'text-white/90 text-shadow-sm'}`}>
                {item}
              </a>
            ))}
          </div>
          <button className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isScrolled ? 'bg-sky-900 text-white hover:bg-sky-800' : 'bg-white text-sky-900 hover:bg-white/90 shadow-lg'}`}>
            立即预订
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: y1, opacity: opacity1 }}
        >
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop" 
            alt="Ocean view from terrace" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Animated Seagulls */}
        <Seagull className="top-[15%]" delay={0} duration={18} yOffset={20} />
        <Seagull className="top-[25%]" delay={5} duration={22} yOffset={-10} />
        <Seagull className="top-[10%]" delay={12} duration={16} yOffset={40} />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 text-shadow-lg tracking-tight"
          >
            推窗见海<br className="md:hidden" />
            <span className="md:ml-4">枕浪入眠</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-2xl text-white/90 font-light tracking-widest mb-10 text-shadow-md"
          >
            逃离城市喧嚣，寻一处静谧海湾
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-medium tracking-widest overflow-hidden transition-all hover:bg-white hover:text-sky-900">
              <span className="relative z-10 flex items-center gap-2">
                开启度假之旅 <Wind className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>

        <AnimatedWaves />
      </section>

      {/* Booking Widget */}
      <div className="relative z-30 px-6">
        <BookingWidget />
      </div>

      {/* Story Section */}
      <section id="关于我们" className="py-24 md:py-32 px-6 relative bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop" 
                  alt="Sunlit bedroom with ocean view" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-sky-100 rounded-full -z-10 blur-3xl opacity-60"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-sky-700">
                <Sun className="w-6 h-6" />
                <span className="tracking-widest text-sm font-medium uppercase">Healing Space</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-800 leading-tight">
                阳光洒进房间的<br/>治愈瞬间
              </h2>
              <p className="text-stone-600 leading-relaxed text-lg font-light">
                在这里，时间仿佛放慢了脚步。清晨，第一缕阳光穿过轻柔的白纱帘，唤醒沉睡的你；夜晚，伴随着海浪拍打礁石的白噪音，进入甜美的梦乡。
              </p>
              <p className="text-stone-600 leading-relaxed text-lg font-light">
                每一间客房都配备了超大观景露台，让你足不出户，便能将无垠蔚蓝尽收眼底。这不仅是一次住宿，更是一场身心的极致松弛之旅。
              </p>
              
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-stone-200">
                <div>
                  <div className="text-3xl font-serif text-sky-900 mb-2">180°</div>
                  <div className="text-sm text-stone-500 tracking-wider">全海景视野</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-sky-900 mb-2">20m</div>
                  <div className="text-sm text-stone-500 tracking-wider">直达私人沙滩</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="体验" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-stone-800 mb-4">沉浸式度假体验</h2>
            <p className="text-stone-500 tracking-widest">每一处细节，皆为放松而生</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Waves, title: "无边泳池", desc: "与海天一色的无边际泳池，提供漂浮下午茶，随手一拍即是大片。" },
              { icon: Coffee, title: "海景露台", desc: "专属私人露台，配备舒适躺椅，吹海风、品咖啡，虚度光阴。" },
              { icon: Anchor, title: "赶海体验", desc: "退潮时分，漫步私人沙滩，体验拾贝抓蟹的纯粹乐趣。" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-8 rounded-2xl bg-stone-50 hover:bg-sky-50 transition-colors duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-sky-700 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-stone-800 mb-3">{feature.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="画廊" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-serif text-4xl mb-4">光影掠影</h2>
              <p className="text-stone-400 tracking-widest font-light">定格每一个心动瞬间</p>
            </div>
            <button className="text-sm tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
              查看全部客房
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="lg:col-span-2 aspect-[16/9] lg:aspect-auto rounded-xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop" alt="Terrace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-serif text-xl">星空海景露台房</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="aspect-square rounded-xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop" alt="Pool" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-serif text-xl">无边际泳池</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="aspect-square rounded-xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1582719478250-c89404bb8a0e?q=80&w=2070&auto=format&fit=crop" alt="Interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-serif text-xl">原木风内饰</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="lg:col-span-2 aspect-[16/9] lg:aspect-auto rounded-xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" alt="Beach" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-serif text-xl">私人白沙滩</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-sky-50 z-0"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-200 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50 z-0"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Compass className="w-12 h-12 text-sky-700 mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-8 leading-tight">
            给自己放个假，<br/>听海风诉说温柔。
          </h2>
          <p className="text-stone-600 mb-10 text-lg font-light">
            本月预订可享连住优惠及双人海鲜晚餐。
          </p>
          <button className="px-10 py-4 bg-sky-900 text-white rounded-full text-lg font-medium tracking-widest hover:bg-sky-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            立即预订房间
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="font-serif text-2xl text-white mb-6">栖海 Azure Haven</div>
            <p className="font-light leading-relaxed max-w-sm mb-6">
              致力于为您提供极致松弛的滨海度假体验。推窗见海，枕浪入眠，在这里找回内心的宁静。
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer">
                <Star className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer">
                <Wind className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 tracking-widest">联系我们</h4>
            <ul className="space-y-4 font-light text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>海南省三亚市海棠湾滨海大道188号</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+86 898 8888 9999</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 tracking-widest">快速链接</h4>
            <ul className="space-y-3 font-light text-sm">
              <li><a href="#" className="hover:text-white transition-colors">关于栖海</a></li>
              <li><a href="#" className="hover:text-white transition-colors">客房预订</a></li>
              <li><a href="#" className="hover:text-white transition-colors">餐饮体验</a></li>
              <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-sm font-light text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2026 栖海 Azure Haven Resort. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

