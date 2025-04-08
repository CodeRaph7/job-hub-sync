
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, GraduationCap, Languages, Briefcase, User } from 'lucide-react';
import { CV } from '@/types/hiring';
import { formatDate } from '@/lib/formatters';

interface CVViewerProps {
  cv: CV;
  name: string;
  avatar: string;
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CVViewer: React.FC<CVViewerProps> = ({ cv, name, avatar, email, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-in-right">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <User className="h-6 w-6" />
            CV / Resume
          </DialogTitle>
          <DialogDescription>
            Profile information for {name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            {avatar && (
              <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover" />
            )}
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-hiring-text/70">{email}</p>
            </div>
          </div>
          
          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-hiring-text/80">{cv.summary}</p>
          </div>
          
          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>Skills</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-hiring-muted/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Work Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>Work Experience</span>
            </h3>
            <div className="space-y-4">
              {cv.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-hiring-border pl-4 pb-4">
                  <h4 className="font-medium text-base">{exp.title}</h4>
                  <div className="text-sm text-hiring-text/80 mb-1">{exp.company} • {exp.location}</div>
                  <div className="text-xs text-hiring-text/60 mb-2 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                    </span>
                  </div>
                  <p className="text-sm text-hiring-text/70">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <span>Education</span>
            </h3>
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-hiring-border pl-4 pb-4">
                  <h4 className="font-medium text-base">{edu.degree}</h4>
                  <div className="text-sm text-hiring-text/80 mb-1">{edu.institution} • {edu.location}</div>
                  <div className="text-xs text-hiring-text/60 mb-2">
                    {edu.startYear} - {edu.endYear || 'Present'}
                  </div>
                  {edu.description && <p className="text-sm text-hiring-text/70">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Languages */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Languages className="h-5 w-5" />
              <span>Languages</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cv.languages.map((lang, index) => (
                <div key={index} className="flex items-center justify-between border rounded-md p-2">
                  <span className="font-medium">{lang.name}</span>
                  <Badge variant={lang.proficiency === 'native' ? 'default' : 'outline'}>
                    {lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVViewer;
