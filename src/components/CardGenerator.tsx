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
  }
];

const greetingVariants = [
  "С Новым 2025 Годом!\n\nПусть этот год принесет счастье, здоровье и исполнение всех желаний!",
  "Поздравляем с Новым Годом!\n\nЖелаем радости, успеха и волшебных моментов в наступающем году!",
  "С Новым 2025 Годом!\n\nПусть каждый день будет наполнен теплом, любовью и яркими впечатлениями!",
  "Счастливого Нового Года!\n\nЖелаем, чтобы все мечты сбылись, а год был полон побед и открытий!",
  "С праздником!\n\nПусть Новый Год принесет море позитива, крепкое здоровье и благополучие!",
  "Новый Год стучится в дверь!\n\nЖелаем вам волшебства, улыбок и незабываемых моментов!",
  "С Новым 2025 Годом!\n\nПусть удача сопутствует вам во всем, а дом будет полон счастья!",
  "Поздравляем!\n\nЖелаем яркого Нового Года, полного вдохновения, любви и процветания!",
  "С Новым Годом!\n\nПусть морозная сказка принесет чудеса, а год будет самым лучшим!",
  "Счастливого Нового 2025 Года!\n\nЖелаем добра, тепла и исполнения самых заветных желаний!"
];

const clickSound = () => {
  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS56+ikTQ0OTqXh8LdkHQU2jdXyzHgrBSF0xPDhkj8KElyx6OyrWBIIQJrd8sFuIgUug8zx2YU0Bx5pu+vpoU0NCkqm4vO5ZCAFNY/V8st7KgQadrju35Q/CRRcsOjsq1cTCECa3fK+biEFLoHM8dqGNQkcabzr6aJNDQpKpuLzumQgBTSO1fLLeisEGnW38+CVOAUUW7Do7K1ZEwhAmt3yv24hBS6BzPHaiDUKGmi66+mjTQ4KSqbi9LxlIQU0j9b0zHssBhx4uvbglzsIFlyx6eyvWRQJQpze88F2JQYvgs/z3Ik3CRxqvO3rpE4OCkul4/S9ZiEGNZDW9c19LQYceLnz4Jc7CRVbr+jsr1kUCEKc3vPBdiYGLoPO89+KOQkcab3s66VPDwpLpeP0v2ciKgVmhuL1vWYiETWP1vXKeioPGnW38eGWOwkVW6/o7K9ZFNAJQ53e88J3JwYug8/z4os6Ch5rvu/sp1ESC0um5PXAaSMFNJHX9c18LgYbdbnz4JY7ChVbrujssVsVCESd3vPDeCkGL4PO8+KLOgoearbv7KhSEwtKpuP1wWkjBjWR1/bNfC4HG3W48+CWOwwVXK3o7LBbFglFnt/zxHkqBy+Dz/Pii zgKHmm37uypUhMLSqbj9cJqJAc1ktf2zX4vBxx1uPLglzsLFVyt6ey/WxYJRJ7f88R5KgcvhM/z4os6Ch5pu+/sq1QTC0ul5PXCaSQHNJLX9s1+Lwcdd7jy4Jc7DBVcrOnswFsXCkWe3/PEeSoHL4TP8+KLOgoeabvv7KtUEwtLpeT1wmkkBzOR1/bOf zAIHXa48uCXOwwVXK3p7MFbFwpFnt/zw3kpBy+Ez/Pii zgKHmm77+yrVBQLSqXj9cJpIwc0ktf2zn8vCB12uPLglzsNFVus6ezAWxcJRZ7f88N5KgYvg8/z4os6Ch5pu+7sq1QTC0ul5PXCaiQHNZLX9s5/Lwgdd7jy4Jc7DBVbrOjswFsWCUSd3vPDeSoGL4PP8+KLOgkeabvu7KtUEwtLpeP1w2okBzWS1/bOfzAIHXa48uCXOwwVW6zo7MBbFwpEnt7zw3kqBi+Dz/Pii zgLH2m87uyqUxMLSqXj9cNqJAc0ktf2zn8vCBx2uPLglzsNFVus6OzAWxcKRJ7e88N5KgYvg8/z4os6Cx5pu+7sq1QTC0ql4/XCaiQHNJLX9s5/Lwgcdrjy4Jc7DRVbrOjswFsWCkOd3vPDeSoGL4PP8+GLOgseabvu7KtUEwtKpeP1w2okBzSS1/bOfzAIHHa48uCWOwwVXKzo7L9bFgpDnd7zw3kqBi+Ez/Pii zgLHmq77+yrVBMLSqXj9cJpJAc0ktf2zn8wCBx2uPLgljsNFVus6OzAWxYKQ53e88N5KgYvhM/z4os6Cx5qu+/sq1QTC0ql4/XCaiQHNJLW9s1/MAcdd7jy4Jc7DBVbrOjswFsWCkOd3vPDeSoGL4TP8+KLOgsearvv7KtUEwtKpeP1wmokBzSS1vbNfzAIHXe48uCWOwwVW6zo7MFbFgpDnd7zw3kqBi+Dz/Pii zgLH2q77+yqVBMLSqXj9cJpJAc0ktb2zn8vCBx2uPLglzsNFVus6OzAWxYKRJ7e88J4KgYvg8/z4Ys6Cx5pu+/sqVQTC0ul4/XCaiQHNZLW9s1/Lwgdd7jy4JY7DBVbrOjswFsWCkOd3vPCeCkGL4PP8+KLOgoeabvv7KpUEwtKpOP1w2kjBzSS1vbOfy8IHXa58uCWOwwVW6zp7MFbFgpEnt7zwngpBy+Dz/Piizkj');
  audio.play().catch(() => {});
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
    clickSound();
    const randomIndex = Math.floor(Math.random() * greetingVariants.length);
    setGreetingText(greetingVariants[randomIndex]);
  };

  const downloadCard = async () => {
    clickSound();
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
    clickSound();
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
                      rows={5}
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
                      <div className={`${selectedTemplate.textColor} text-xl font-bold leading-relaxed whitespace-pre-line drop-shadow-lg`}>
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
