import React, { useState, useEffect, useCallback, useRef } from 'react';

export interface AttackerAction {
  id: string;
  timestamp: string;
  layer: 'SSH' | 'HTTP' | 'SQL';
  action: string;
  maliciousness: number;
  entropy: number;
  timing: number;
}

export interface DeceptionResponse {
  id: string;
  timestamp: string;
  response: string;
  analysis: string;
  mutation: string;
}

export interface SystemMetrics {
  entropyRate: number;
  confusionProbability: number;
  engagementScore: number;
  intelligenceYield: number;
  adversaryACI: number;
  dnaSync: number;
}

// Shannon Entropy calculation: H(X) = -sum(p(x) * log2(p(x)))
const calculateEntropy = (actions: string[]) => {
  if (actions.length === 0) return 0;
  const counts: Record<string, number> = {};
  actions.forEach(a => counts[a] = (counts[a] || 0) + 1);
  const probs = Object.values(counts).map(c => c / actions.length);
  return -probs.reduce((sum, p) => sum + p * Math.log2(p), 0);
};

// Confusion Probability: P_confuse = 1 - product(1 - px)
const calculateConfusionProb = (deceptionCount: number) => {
  const baseProb = 0.15; // Probability of confusion per active trap
  let product = 1;
  for (let i = 0; i < Math.min(deceptionCount, 10); i++) {
    product *= (1 - baseProb);
  }
  return 1 - product;
};

const DECEPTION_RESPONSES = [
  "Deploying shadow-net redirector to virtualized subnet.",
  "Injecting high-entropy noise into SQL response stream.",
  "Mutating SSH banner to simulate legacy vulnerable service.",
  "Synthesizing illusionary file system hierarchy (root_v2).",
  "Redirecting POST request to isolated sandbox environment.",
  "Altering timing signatures to mask real system latency.",
  "Generating fake honey-tokens in memory space 0x7F.",
  "Deploying recursive tarpit on active session handle.",
  "Simulating database corruption on unauthorized SELECT.",
  "Mirroring attacker traffic to internal monitoring loop."
];

const ANALYSES = [
  "Tactical intent: Privilege escalation detected.",
  "Pattern match: Automated vulnerability scanner.",
  "Heuristic alert: Anomalous timing in command sequence.",
  "Threat signature: Known exploit payload identified.",
  "Behavioral analysis: Human-driven reconnaissance."
];

export const useAetherEngine = () => {
  const [threatLevel, setThreatLevel] = useState(25);
  const [confusionIndex, setConfusionIndex] = useState(45);
  const [attackerLogs, setAttackerLogs] = useState<AttackerAction[]>([]);
  const [deceptionLogs, setDeceptionLogs] = useState<DeceptionResponse[]>([]);
  const [isEngaging, setIsEngaging] = useState(false);
  const [digitalDNA, setDigitalDNA] = useState<string[]>(['0x4F', '0x12', '0xBC']);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    entropyRate: 1.24,
    confusionProbability: 0.45,
    engagementScore: 65,
    intelligenceYield: 0.32,
    adversaryACI: 0.92,
    dnaSync: 0.88
  });

  const lastActionTime = useRef<number>(Date.now());

  const generateDeception = useCallback((action: AttackerAction) => {
    setIsEngaging(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const response = DECEPTION_RESPONSES[Math.floor(Math.random() * DECEPTION_RESPONSES.length)];
      const analysis = ANALYSES[Math.floor(Math.random() * ANALYSES.length)];
      
      const newDeception: DeceptionResponse = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        response,
        analysis,
        mutation: `DNA_SEQ_${Math.floor(Math.random() * 1000).toString(16).toUpperCase()}`,
      };

      setDeceptionLogs(prev => [newDeception, ...prev].slice(0, 50));
      
      setMetrics(prev => ({
        ...prev,
        confusionProbability: calculateConfusionProb(deceptionLogs.length + 1),
        engagementScore: Math.min(100, prev.engagementScore + 2),
        intelligenceYield: Math.min(1, prev.intelligenceYield + 0.01)
      }));

      setConfusionIndex(prev => Math.min(100, prev + 5));
      setDigitalDNA(prev => [...prev, `0x${Math.floor(Math.random() * 256).toString(16).toUpperCase()}`].slice(-8));
      
      // Mitigation effect: drop threat level significantly
      setThreatLevel(prev => Math.max(10, prev - 15));
      
      setIsEngaging(false);
    }, 1000);
  }, [deceptionLogs.length]);

  // Natural decay of threat level
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(prev => {
        if (prev <= 10) return prev;
        return Math.max(10, prev - 1);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const layers: ('SSH' | 'HTTP' | 'SQL')[] = ['SSH', 'HTTP', 'SQL'];
      const actions = {
        SSH: ['Attempting root login', 'Brute forcing port 22', 'Scanning banners', 'Injecting shellcode', 'Privilege escalation attempt'],
        HTTP: ['GET /admin', 'POST /login (SQLi attempt)', 'Scanning for .env', 'Directory traversal', 'XSS payload injection'],
        SQL: ['SELECT * FROM users', 'UNION SELECT null, version()', 'Dropping table logs', 'Honeytoken triggered', 'Blind SQLi timing attack'],
      };

      const layer = layers[Math.floor(Math.random() * layers.length)];
      const layerActions = actions[layer];
      const actionText = layerActions[Math.floor(Math.random() * layerActions.length)];
      
      const now = Date.now();
      const timing = (now - lastActionTime.current) / 1000;
      lastActionTime.current = now;

      const currentActions = [actionText, ...attackerLogs.map(l => l.action)].slice(0, 20);
      const entropy = calculateEntropy(currentActions);

      const newAction: AttackerAction = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        layer,
        action: actionText,
        maliciousness: 60 + Math.floor(Math.random() * 40), // Ensure actions are mostly malicious
        entropy,
        timing
      };

      setAttackerLogs(prev => [newAction, ...prev].slice(0, 50));
      
      // Update Threat Level: Increase during attacks
      setThreatLevel(prev => {
        const increase = Math.floor(newAction.maliciousness / 10);
        return Math.min(100, prev + increase);
      });

      // Update system metrics
      setMetrics(prev => ({
        ...prev,
        entropyRate: Number(entropy.toFixed(2)),
        dnaSync: Math.max(0, Math.min(1, prev.dnaSync + (Math.random() * 0.02 - 0.01))),
        adversaryACI: Number((0.85 + Math.random() * 0.1).toFixed(2))
      }));

      // Trigger deception if threat is high enough or action is malicious
      if (newAction.maliciousness > 70 || entropy > 2.5) {
        generateDeception(newAction);
      }
    }, 2500); // Slightly faster interval for more activity

    return () => clearInterval(interval);
  }, [generateDeception, attackerLogs]);

  return {
    threatLevel,
    confusionIndex,
    attackerLogs,
    deceptionLogs,
    isEngaging,
    digitalDNA,
    metrics
  };
};
