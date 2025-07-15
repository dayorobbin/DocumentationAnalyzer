import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, Search, User } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddTask: () => void;
}

export function Header({ searchQuery, onSearchChange, onAddTask }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">TaskFlow</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-slate-600">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
