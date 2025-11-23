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
    <div className="bg-linear-to-b from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <main className="flex flex-col items-center justify-center gap-16 p-4 tablet:p-8 py-20">
          <SectionHeader
            title="Get In Touch"
            description="Have a project in mind or want to collaborate? I'd love to hear from you. Feel free to reach out through any of the channels below."
          />

        <div className="grid pc:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info & Social Links */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Contact Information
            </h3>
            <div className="flex flex-col gap-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors group"
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-neutral-800 group-hover:scale-110 transition-transform ${method.color}`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{method.label}</p>
                    <p className="font-medium truncate">{method.value}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-8 hover:shadow-xl transition-shadow">
            <h3 className="font-bold text-2xl mb-2">Send Me a Message</h3>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and I&apos;ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid tablet:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
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
                    className="h-12"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or how I can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full tablet:w-auto tablet:self-end group">
                <span className="flex items-center gap-2">
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}

