"use client";

import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemContent,
  ListGroup,
  ListGroupTitle,
} from "@/components/custom/list"; // Adjust the import path as necessary
import { Bot, CloudCog, SquareDashedBottomCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react"


const ListGrid = () => {
  const aiTerms = Array.from({ length: 21 }, (_, index) => {
    const terms = [
      "Generative Adversarial Networks",
      "Natural Language Processing",
      "Reinforcement Learning Algorithms",
      "Computer Vision Models",
      "Speech-to-Text Technology",
      "Text-to-Speech Synthesis",
      "Image Segmentation Techniques",
      "Facial Recognition Systems",
      "Anomaly Detection Methods",
      "Deep Reinforcement Learning",
      "Transfer Learning Techniques",
      "Neural Network Architectures",
      "Natural Language Generation",
      "Computer Vision Applications",
      "Robotic Process Automation",
      "Predictive Analytics",
      "Data Mining Techniques",
      "Big Data Technologies",
      "AI Ethics and Governance",
      "Explainable AI",
      "Federated Learning",
    ];
    const icons = [<Bot />];
    return {
      term: terms[index % terms.length],
      icon: icons[index % icons.length],
    };
  });

  return (
    <div className=" container p-4 min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="relative flex flex-col items-center">

        <motion.div 
          className="absolute top-0 -z-10 opacity-15 shadow-2xl bg-background/5 size-80 rounded-full border-primary border mb-4"
          initial={{ scale: 1 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        <motion.div 
          className="absolute top-0 left-52 -z-10 opacity-15 shadow-2xl bg-background/5 size-80 rounded-full border-primary border mb-4"
          initial={{ scale: 1 }}
          animate={{ scale: 1.3 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>
        <Badge
          variant={"secondary"}
          className="mb-1"
        >
          Capabilities
        </Badge>
        <h1 className="text-2xl font-bold text-primary">
          Fast, reliable, and cost-efficient
        </h1>
        <p className="mb-4 text-muted-foreground">
          Here are some key terms related to AI Capabilities
        </p>
      </div>
      <List
       aria-label="AI Capabilities"
      listRole={"list"}
        isInteractive
        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 h-auto"
      >
        {aiTerms.map((term, index) => (
          <ListItem
            key={index}
            variant="striped"
            size={"md"}
            className=" border-dotted border h-full"
          >
            <ListItemIcon>{term.icon}</ListItemIcon>
            <ListItemContent>{term.term}</ListItemContent>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListGrid;
