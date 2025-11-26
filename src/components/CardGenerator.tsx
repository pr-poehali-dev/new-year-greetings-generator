import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import html2canvas from 'html2canvas';

interface Template {
  id: number;
  name: string;
  image: string;
  textColor: string;
  icon: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: 'Золотое волшебство',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/f75ae52a-23b3-4611-865b-5d11d443c586.jpg',
    textColor: 'text-white',
    icon: 'Sparkles'
  },
  {
    id: 2,
    name: 'Новогодняя елка',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/0cbc9ba2-f1a5-4067-8363-b3bff85445c5.jpg',
    textColor: 'text-white',
    icon: 'TreePine'
  },
  {
    id: 3,
    name: 'Зимний домик',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/867ee601-a199-40f6-9685-61b02ac1a964.jpg',
    textColor: 'text-white',
    icon: 'Home'
  },
  {
    id: 4,
    name: 'Подарки',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/94f0b09c-0920-4c92-a1c4-17aede9e650c.jpg',
    textColor: 'text-white',
    icon: 'Gift'
  },
  {
    id: 5,
    name: 'Празднование',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/a1477cb2-c2c6-4882-9cf0-adad4dd66c8d.jpg',
    textColor: 'text-white',
    icon: 'PartyPopper'
  },
  {
    id: 6,
    name: 'Сани Деда Мороза',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/2a91e630-649a-48da-9ecb-929850892622.jpg',
    textColor: 'text-white',
    icon: 'Plane'
  },
  {
    id: 7,
    name: 'Зимний лес',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/50c371e5-1615-4c02-95ff-0245467d4cc4.jpg',
    textColor: 'text-white',
    icon: 'Trees'
  },
  {
    id: 8,
    name: 'Уютный камин',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/e2c07a18-3884-48db-8eaa-fee59912f03c.jpg',
    textColor: 'text-white',
    icon: 'Flame'
  },
  {
    id: 9,
    name: 'Каток',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/453f415c-8195-4a4e-8000-609cb1e19ae2.jpg',
    textColor: 'text-white',
    icon: 'Snowflake'
  },
  {
    id: 10,
    name: 'Северное сияние',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/12e5a396-e5a0-4eb0-9627-f25869174cc7.jpg',
    textColor: 'text-white',
    icon: 'Stars'
  },
  {
    id: 11,
    name: 'Пряничный домик',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/33e709e1-bcb9-47be-ac67-8e0c9f281cc2.jpg',
    textColor: 'text-white',
    icon: 'Cookie'
  },
  {
    id: 12,
    name: 'Полночь',
    image: 'https://cdn.poehali.dev/projects/e15b40d0-7d98-491e-b0fe-88d3cd79e40b/files/f8f2d4ee-6a6f-4e56-8773-b2be176101f3.jpg',
    textColor: 'text-white',
    icon: 'Clock'
  }
];

const greetingVariants = [
  "✨ С Новым 2025 Годом! ✨\n\nПусть этот волшебный год принесёт счастье, здоровье и исполнение всех заветных желаний! Пусть каждый день будет наполнен радостью и волшебством! 🎄",
  
  "🎄 Поздравляем с Новым Годом! 🎄\n\nЖелаем, чтобы новогодняя сказка продолжалась весь год! Пусть в вашей жизни будет много радости, тепла и волшебных моментов! ⭐",
  
  "⭐ С Новым 2025 Годом! ⭐\n\nПусть звёзды освещают ваш путь к успеху! Желаем любви, счастья и исполнения самых смелых мечтаний! Пусть год будет полон ярких впечатлений! ✨",
  
  "❄️ Счастливого Нового Года! ❄️\n\nПусть морозная сказка принесёт в ваш дом уют и радость! Желаем крепкого здоровья, благополучия и волшебных сюрпризов! 🎁",
  
  "🎁 С праздником! 🎁\n\nПусть Новый Год подарит океан позитива, море улыбок и исполнение всех желаний! Пусть каждый день приносит новые победы и открытия! 🌟",
  
  "🌟 Новый Год стучится в дверь! 🌟\n\nОткройте двери волшебству и чудесам! Желаем вам сказочного настроения, тёплых моментов с близкими и незабываемых впечатлений! ❄️",
  
  "🎊 С Новым 2025 Годом! 🎊\n\nПусть удача будет верной спутницей во всех начинаниях! Желаем, чтобы дом был полон счастья, смеха и любви! Пусть мечты сбываются! ✨",
  
  "💫 Поздравляем! 💫\n\nЖелаем яркого и волшебного Нового Года! Пусть он будет наполнен вдохновением, творчеством, любовью и процветанием! Счастья и радости вам! 🎄",
  
  "🎅 С Новым Годом! 🎅\n\nПусть Дед Мороз принесёт в ваш дом мешок счастья, здоровья и удачи! Желаем волшебных моментов и исполнения всех желаний! ⭐",
  
  "🎆 Счастливого Нового 2025 Года! 🎆\n\nПусть фейерверк эмоций освещает каждый ваш день! Желаем добра, тепла, успеха и невероятных приключений в наступающем году! 🎉",
  
  "🌠 С Новым Годом! 🌠\n\nПусть падающие звёзды исполняют ваши желания! Желаем волшебства, радости и удивительных открытий в новом году! Пусть всё сбывается! ✨",
  
  "🎀 Поздравляем с праздником! 🎀\n\nПусть Новый Год развяжет все узелки проблем и подарит море радости! Желаем тепла, уюта и сказочного настроения каждый день! 🎄",
  
  "❄️ С Новым 2025 Годом! ❄️\n\nПусть снежинки принесут в ваш дом счастье и благополучие! Желаем вам волшебных моментов, крепкого здоровья и любви близких! 💝",
  
  "🕯️ Счастливого праздника! 🕯️\n\nПусть свет новогодних свечей освещает путь к успеху! Желаем тепла, радости и исполнения всех заветных мечтаний! С Новым Годом! 🎊",
  
  "🎵 С Новым Годом! 🎵\n\nПусть жизнь звучит как новогодняя мелодия – радостно и волшебно! Желаем гармонии, счастья и удивительных сюрпризов от судьбы! ✨"
];

const magicSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const playTone = (frequency: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  const now = audioContext.currentTime;
  playTone(523.25, now, 0.15);
  playTone(659.25, now + 0.1, 0.15);
  playTone(783.99, now + 0.2, 0.2);
};

export default function CardGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [greetingText, setGreetingText] = useState(greetingVariants[0]);
  const [recipientName, setRecipientName] = useState('');
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5
    }));
    setSnowflakes(flakes);
  }, []);

  const generateGreeting = () => {
    magicSound();
    const randomIndex = Math.floor(Math.random() * greetingVariants.length);
    setGreetingText(greetingVariants[randomIndex]);
  };

  const downloadCard = async () => {
    magicSound();
    const cardElement = document.getElementById('greeting-card');
    if (!cardElement) return;

    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    });

    const link = document.createElement('a');
    link.download = 'new-year-card.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleTemplateClick = (template: Template) => {
    magicSound();
    setSelectedTemplate(template);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-pink-900 relative overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            fontSize: `${0.5 + Math.random() * 1}em`
          }}
        >
          ❄
        </div>
      ))}

      <div className="absolute top-10 left-10 text-6xl animate-float">🎄</div>
      <div className="absolute top-20 right-20 text-6xl animate-float" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute bottom-20 left-20 text-6xl animate-float" style={{ animationDelay: '2s' }}>🎁</div>
      <div className="absolute bottom-32 right-32 text-6xl animate-float" style={{ animationDelay: '1.5s' }}>✨</div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-7xl mb-4 animate-shimmer">🎅</div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-float drop-shadow-2xl">
            🎄 Новогодние открытки 🎄
          </h1>
          <p className="text-2xl text-yellow-200 drop-shadow-lg animate-shimmer">
            ✨ Создайте волшебное поздравление для близких ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
          <div className="lg:col-span-2 space-y-6 animate-scale-in">
            <Card className="bg-gradient-to-br from-red-600/30 to-green-600/30 backdrop-blur-md border-4 border-yellow-400/50 shadow-2xl">
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white drop-shadow-lg">
                  <Icon name="Images" size={32} className="text-yellow-300" />
                  🎨 Выберите открытку
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateClick(template)}
                      className={`relative rounded-2xl overflow-hidden transition-all hover:scale-105 ${
                        selectedTemplate.id === template.id ? 'ring-4 ring-yellow-400 shadow-yellow-400/50 shadow-xl' : ''
                      }`}
                    >
                      <img src={template.image} alt={template.name} className="w-full h-32 object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <div className="text-white text-sm font-bold drop-shadow">{template.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-md border-4 border-pink-400/50 shadow-2xl">
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white drop-shadow-lg">
                  <Icon name="Wand2" size={32} className="text-pink-300" />
                  💬 Текст поздравления
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-bold mb-2 text-white drop-shadow">Кому:</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Имя получателя"
                      className="w-full px-4 py-3 bg-white/90 border-2 border-pink-300 rounded-xl focus:ring-4 focus:ring-pink-400 outline-none text-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold mb-2 text-white drop-shadow">Поздравление:</label>
                    <textarea
                      value={greetingText}
                      onChange={(e) => setGreetingText(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 bg-white/90 border-2 border-pink-300 rounded-xl focus:ring-4 focus:ring-pink-400 outline-none text-lg resize-none"
                      placeholder="Напишите поздравление..."
                    />
                  </div>
                  <Button
                    onClick={generateGreeting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl py-6 rounded-xl transition-all hover:scale-105 shadow-xl font-bold"
                  >
                    <Icon name="Sparkles" size={28} className="mr-2" />
                    🎲 Сгенерировать поздравление
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 backdrop-blur-md border-4 border-cyan-400/50 shadow-2xl">
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white drop-shadow-lg">
                  <Icon name="Eye" size={32} className="text-cyan-300" />
                  👀 Предпросмотр
                </h2>
                <div
                  id="greeting-card"
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backgroundImage: `url(${selectedTemplate.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div className="text-center">
                      {recipientName && (
                        <div className="text-3xl font-bold text-white drop-shadow-lg mb-4 bg-black/40 rounded-xl p-3 inline-block">
                          Для {recipientName}
                        </div>
                      )}
                    </div>

                    <div className="text-center bg-black/50 backdrop-blur-sm rounded-2xl p-6">
                      <div className={`${selectedTemplate.textColor} text-lg font-bold leading-relaxed whitespace-pre-line drop-shadow-lg`}>
                        {greetingText}
                      </div>
                    </div>

                    <div className="text-center text-white/90 text-2xl font-bold drop-shadow-lg">
                      2025
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={downloadCard}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl py-7 rounded-xl transition-all hover:scale-105 shadow-xl font-bold"
            >
              <Icon name="Download" size={28} className="mr-2" />
              💾 Скачать открытку
            </Button>
          </div>
        </div>

        <div className="text-right text-white/70 text-sm font-medium drop-shadow">
          Братск проект школа 24
        </div>
      </div>
    </div>
  );
}
