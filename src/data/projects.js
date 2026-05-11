export const projects = [
  {
    title: 'Runtime Visualization System',
    tag: 'Real-time visualization',
    description:
      'Pipeline for runtime data extraction and overlay rendering: memory-backed state, world-to-screen projection, and stable frame pacing.',
    tech: ['C++', 'DirectX', 'Linear algebra'],
  },
  {
    title: 'Directional Computation Engine',
    tag: 'Engine research',
    description:
      'Angular computation and interpolation in 3D: quaternion rotations, velocity estimation, and latency-aware trajectory prediction.',
    tech: ['C++', '3D math', 'Quaternions'],
  },
  {
    title: 'Process Memory Toolkit',
    tag: 'Low-level tooling',
    description:
      'Framework for process memory via ADB: offset resolution, pointer chains, and live structure inspection for analysis workflows.',
    tech: ['C++', 'ADB', 'Python'],
  },
  {
    title: 'Il2Cpp Runtime Analyzer',
    tag: 'Reverse engineering',
    description:
      'Unity / Il2Cpp analysis: class hierarchies, method offsets, and managed-to-native mapping for research and debugging.',
    tech: ['C++', 'Il2Cpp', 'IDA Pro'],
  },
  {
    title: 'ImGui Overlay Framework',
    tag: 'Rendering',
    description:
      'ImGui overlays with DirectX hooks: configurable panels, primitives, and composition for operational UIs on top of host apps.',
    tech: ['C++', 'ImGui', 'DirectX 11'],
  },
  {
    title: 'Binary Signature Resolver',
    tag: 'System analysis',
    description:
      'Pattern scanning and signature resolution across ASLR and versioned binaries on Windows and Android targets.',
    tech: ['C++', 'WinAPI', 'ADB'],
  },
]
