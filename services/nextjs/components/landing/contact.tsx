'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Github, Linkedin, Phone, MapPin, Send, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import SectionHeader from './section-header';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현 시 이메일 전송 로직 추가
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@yourusername',
      link: 'https://github.com/yourusername',
      color: 'text-gray-800 dark:text-gray-200'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Your Name',
      link: 'https://linkedin.com/in/yourusername',
      color: 'text-blue-700 dark:text-blue-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+82 10-1234-5678',
      link: 'tel:+821012345678',
      color: 'text-green-600 dark:text-green-400'
    }
  ];

  return (
    <div className="bg-muted">
      <main className="flex flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-18 tablet:py-20">
          <SectionHeader
            title="Get In Touch"
            description="Have a project in mind or want to collaborate? I'd love to hear from you. Feel free to reach out through any of the channels below."
          />

        <div className="grid tablet:grid-cols-2 gap-6 smalltablet:gap-7 tablet:gap-8 max-w-6xl mx-auto w-full">
          {/* Contact Info & Social Links */}
          <Card className="p-5 smalltablet:p-6 tablet:p-8 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-lg smalltablet:text-xl mb-4 smalltablet:mb-5 tablet:mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 smalltablet:w-5 smalltablet:h-5 text-primary" />
              Contact Information
            </h3>
            <div className="flex flex-col gap-3 smalltablet:gap-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 smalltablet:gap-4 p-3 smalltablet:p-4 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className={`flex items-center justify-center w-10 h-10 smalltablet:w-12 smalltablet:h-12 rounded-full bg-muted group-hover:scale-110 transition-transform ${method.color}`}>
                    <method.icon className="w-5 h-5 smalltablet:w-6 smalltablet:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs smalltablet:text-sm text-muted-foreground">{method.label}</p>
                    <p className="text-sm smalltablet:text-base font-medium truncate">{method.value}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 smalltablet:w-4 smalltablet:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-5 smalltablet:p-6 tablet:p-8 hover:shadow-xl transition-shadow">
            <h3 className="font-bold text-xl smalltablet:text-2xl mb-1.5 smalltablet:mb-2">Send Me a Message</h3>
            <p className="text-sm smalltablet:text-base text-muted-foreground mb-6 smalltablet:mb-8">
              Fill out the form below and I&apos;ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 smalltablet:gap-5 tablet:gap-6">
              <div className="grid tablet:grid-cols-2 gap-4 smalltablet:gap-5 tablet:gap-6">
                <div className="flex flex-col gap-1.5 smalltablet:gap-2">
                  <label htmlFor="name" className="text-xs smalltablet:text-sm font-medium">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-10 smalltablet:h-12"
                  />
                </div>

                <div className="flex flex-col gap-1.5 smalltablet:gap-2">
                  <label htmlFor="email" className="text-xs smalltablet:text-sm font-medium">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-10 smalltablet:h-12"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 smalltablet:gap-2">
                <label htmlFor="subject" className="text-xs smalltablet:text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-10 smalltablet:h-12"
                />
              </div>

              <div className="flex flex-col gap-1.5 smalltablet:gap-2">
                <label htmlFor="message" className="text-xs smalltablet:text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or how I can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="resize-none smalltablet:rows-8"
                />
              </div>

              <Button type="submit" size="lg" className="w-full tablet:w-auto tablet:self-end group">
                <span className="flex items-center gap-2">
                  Send Message
                  <Send className="w-3.5 h-3.5 smalltablet:w-4 smalltablet:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}

