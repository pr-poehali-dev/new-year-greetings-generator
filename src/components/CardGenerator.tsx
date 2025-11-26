import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import html2canvas from 'html2canvas';

interface Template {
  id: number;
  name: string;
  gradient: string;
  pattern: string;
  icon: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: 'Зимняя ночь',
    gradient: 'from-blue-900 via-purple-900 to-pink-900',
    pattern: '❄️',
    icon: 'Snowflake'
  },
  {
    id: 2,
    name: 'Новогодняя елка',
    gradient: 'from-green-800 via-emerald-700 to-teal-800',
    pattern: '🎄',
    icon: 'TreePine'
  },
  {
    id: 3,
    name: 'Праздничный огонь',
    gradient: 'from-red-700 via-orange-600 to-yellow-500',
    pattern: '✨',
    icon: 'Sparkles'
  },
  {
    id: 4,
    name: 'Золотое сияние',
    gradient: 'from-yellow-600 via-amber-500 to-orange-400',
    pattern: '⭐',
    icon: 'Star'
  }
];

export default function CardGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [greetingText, setGreetingText] = useState('С Новым 2025 Годом!\n\nПусть этот год принесет счастье, здоровье и удачу!');
  const [recipientName, setRecipientName] = useState('');
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5
    }));
    setSnowflakes(flakes);
  }, []);

  const downloadCard = async () => {
    const cardElement = document.getElementById('greeting-card');
    if (!cardElement) return;

    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 2
    });

    const link = document.createElement('a');
    link.download = 'new-year-card.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`
          }}
        >
          ❄
        </div>
      ))}

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-float">
            Новогодние открытки
          </h1>
          <p className="text-xl text-white/80">
            Создайте уникальное поздравление для близких
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6 animate-scale-in">
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Palette" size={28} className="text-primary" />
                  Выберите шаблон
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-4 rounded-xl bg-gradient-to-br ${template.gradient} text-white text-4xl transition-all hover:scale-105 ${
                        selectedTemplate.id === template.id ? 'ring-4 ring-primary' : ''
                      }`}
                    >
                      <div className="text-6xl mb-2 animate-shimmer">{template.pattern}</div>
                      <div className="text-sm font-medium">{template.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-2 border-secondary/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="MessageSquareText" size={28} className="text-secondary" />
                  Текст поздравления
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Кому</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Имя получателя"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Поздравление</label>
                    <Textarea
                      value={greetingText}
                      onChange={(e) => setGreetingText(e.target.value)}
                      rows={6}
                      className="w-full bg-background border border-border focus:ring-2 focus:ring-primary"
                      placeholder="Напишите поздравление..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-accent/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Eye" size={28} className="text-accent" />
                  Предпросмотр
                </h2>
                <div
                  id="greeting-card"
                  className={`relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${selectedTemplate.gradient} p-8 overflow-hidden shadow-2xl`}
                >
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-4xl animate-shimmer"
                        style={{
                          left: `${(i * 20) % 100}%`,
                          top: `${(i * 15) % 100}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      >
                        {selectedTemplate.pattern}
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="text-center">
                      {recipientName && (
                        <div className="text-2xl font-bold text-white/90 mb-4">
                          Для {recipientName}
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <div className="text-white text-lg md:text-xl font-medium leading-relaxed whitespace-pre-line">
                        {greetingText}
                      </div>
                    </div>

                    <div className="text-center text-white/60 text-sm">
                      2025
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={downloadCard}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6 rounded-xl transition-all hover:scale-105"
            >
              <Icon name="Download" size={24} className="mr-2" />
              Скачать открытку
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
