import React, { useState, useRef, useEffect, DragEvent, ChangeEvent, MouseEvent } from 'react';
import SvgButterfly from './SvgButterfly';
import { 
  Upload, 
  Download, 
  RotateCw, 
  Sparkles, 
  CornerRightDown, 
  ShieldCheck, 
  BadgeCheck, 
  Check, 
  RefreshCw, 
  Grid, 
  X, 
  Share2, 
  Heart, 
  User, 
  Flame, 
  Info,
  Sliders,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Move,
  MousePointer,
  Hand,
  Plus,
  Minus
} from 'lucide-react';

interface SavedOverlay {
  id: string;
  name: string;
  timestamp: string;
  dataUrl: string;
}

export default function ProfileOverlay() {
  // Input address or auto-detected address
  const [address, setAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [detectedAlignment, setDetectedAlignment] = useState<'light' | 'shadow' | 'nexus'>('light');
  const [detectedSeed, setDetectedSeed] = useState<string>('karma-social-layer');
  const [isEvolved, setIsEvolved] = useState<boolean>(false);

  // Uploaded image state
  const [uploadedBaseImg, setUploadedBaseImg] = useState<string | null>(null);
  const [imgName, setImgName] = useState<string>('');
  const [imageRatio, setImageRatio] = useState<number>(1); // width / height
  const [bgType, setBgType] = useState<'image' | 'transparent' | 'dark'>('transparent');
  const [baseImgZoom, setBaseImgZoom] = useState<number>(1.0);
  const [baseImgPanX, setBaseImgPanX] = useState<number>(0);
  const [baseImgPanY, setBaseImgPanY] = useState<number>(0);

  // High performance dynamic preview cache
  const [compositeDataUrl, setCompositeDataUrl] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'butterfly' | 'background'>('butterfly');

  // Gesture state management
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [touchStartZoom, setTouchStartZoom] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panStartOffset, setPanStartOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Overlay controller variables
  const [overlayScale, setOverlayScale] = useState<number>(20); // 10% to 60% of image width
  const [offsetX, setOffsetX] = useState<number>(3); // Right margin, 0% to 50%
  const [offsetY, setOffsetY] = useState<number>(3); // Top margin, 0% to 50%
  const [rotation, setRotation] = useState<number>(0); // -180deg to 180deg
  const [glowSize, setGlowSize] = useState<number>(15); // Glow blur radius
  const [glowColor, setGlowColor] = useState<string>('#F59E0B');
  const [enableGlow, setEnableGlow] = useState<boolean>(true);
  const [keyOutBackground, setKeyOutBackground] = useState<boolean>(false);

  // Badge selection
  // None, Holder Pill, Genesis Badge, Verified Pill
  const [selectedBadge, setSelectedBadge] = useState<'none' | 'holder' | 'genesis' | 'verified'>('holder');

  // Preview / Canvas reference
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenButterflyRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generation & saving states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [savedCreations, setSavedCreations] = useState<SavedOverlay[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'library'>('editor');
  const [socialModalPreset, setSocialModalPreset] = useState<{
    open: boolean;
    dataUrl: string | null;
    platform: 'x-pfp' | 'x-banner' | 'tg' | 'discord';
  }>({ open: false, dataUrl: null, platform: 'x-pfp' });

  // Load saved address and initial creations on mount
  useEffect(() => {
    const savedAddr = localStorage.getItem('karma_scanned_address');
    if (savedAddr) {
      setAddress(savedAddr);
      setIsConnected(true);
      deriveButterflyFromAddress(savedAddr);
    }

    // Load items in library
    const cached = localStorage.getItem('karma_overlay_creations');
    if (cached) {
      try {
        setSavedCreations(JSON.parse(cached));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const deriveButterflyFromAddress = (addr: string) => {
    let sum = 0;
    for (let i = 0; i < addr.length; i++) {
      sum += addr.charCodeAt(i);
    }

    // Determine values
    let align: 'light' | 'shadow' | 'nexus' = 'light';
    if (sum % 77 === 0) align = 'nexus';
    else if (sum % 2 === 1) align = 'shadow';

    setDetectedAlignment(align);
    setDetectedSeed(addr);

    // Dynamic glow match
    if (align === 'nexus') {
      setGlowColor('#10b981'); // emerald
    } else if (align === 'shadow') {
      setGlowColor('#c084fc'); // purple
    } else {
      setGlowColor('#34d399'); // light teal-emerald
    }

    // Check if user has mutated/evolved this butterfly
    const evolvedList = localStorage.getItem('karma_evolved_ids');
    if (evolvedList) {
      try {
        const ids = JSON.parse(evolvedList) as string[];
        const bId = `Butterfly #${(sum % 8999) + 1000}`;
        if (ids.includes(bId)) {
          setIsEvolved(true);
        } else {
          setIsEvolved(false);
        }
      } catch {
        setIsEvolved(false);
      }
    }
  };

  const handleConnectMock = () => {
    if (!address.startsWith('0x') || address.length < 10) {
      // Create random beautiful address
      const hex = '0123456789abcdef';
      let mock = '0x';
      for (let i = 0; i < 40; i++) {
        mock += hex[Math.floor(Math.random() * 16)];
      }
      setAddress(mock);
      setIsConnected(true);
      deriveButterflyFromAddress(mock);
    } else {
      setIsConnected(true);
      deriveButterflyFromAddress(address);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress('');
    setIsEvolved(false);
    // Maintain standard default seed
    setDetectedAlignment('light');
    setDetectedSeed('karma-social-layer');
    setGlowColor('#F59E0B');
  };

  // Image upload handlers
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setImgName(file.name.split('.')[0] || 'profile_composition');
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setUploadedBaseImg(src);
      setBgType('image');

      // Extract ratio
      const imgTemp = new Image();
      imgTemp.onload = () => {
        setImageRatio(imgTemp.width / imgTemp.height);
      };
      imgTemp.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  // Preset quick-toggles
  const applyPreset = (align: 'light' | 'shadow' | 'nexus', isEv: boolean) => {
    setDetectedAlignment(align);
    setIsEvolved(isEv);
    setDetectedSeed(`preset-${align}-${isEv ? 'evolved' : 'normal'}`);
    
    if (align === 'nexus') setGlowColor('#10b981');
    else if (align === 'shadow') setGlowColor('#c084fc');
    else setGlowColor('#34d399');
  };

  // Main high-resolution generation engine using Canvas
  const generateSocialComposition = async () => {
    setIsGenerating(true);

    try {
      // 1. Load background if image mode is active and we have an image
      const useBgImage = uploadedBaseImg && bgType === 'image';
      const baseImg = new Image();
      
      if (useBgImage && uploadedBaseImg) {
        await new Promise<void>((resolve, reject) => {
          baseImg.onload = () => resolve();
          baseImg.onerror = () => reject(new Error('Failed to load profile base image'));
          baseImg.src = uploadedBaseImg;
        });
      }

      // 2. Create offscreen SVG butterfly image
      const svgContainer = hiddenButterflyRef.current;
      const svgElement = svgContainer?.querySelector('svg');
      if (!svgElement) throw new Error('Rendered Vector Butterfly Node could not be found');

      // Clear any temporary classes that could cause rendering offsets or animations in static serialization
      const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
      clonedSvg.setAttribute('width', '500');
      clonedSvg.setAttribute('height', '500');

      const svgString = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(svgBlob);

      const vectorImg = new Image();
      await new Promise<void>((resolve, reject) => {
        vectorImg.onload = () => resolve();
        vectorImg.onerror = () => reject(new Error('Vector conversion failed'));
        vectorImg.src = blobUrl;
      });

      // 3. Prepare high-resolution canvas
      const canvas = document.createElement('canvas');
      canvas.width = useBgImage ? baseImg.naturalWidth : 500;
      canvas.height = useBgImage ? baseImg.naturalHeight : 500;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to acquire 2D canvas context');

      // 4. Draw profile background
      if (useBgImage) {
        ctx.save();
        const zoom = baseImgZoom;
        const panX = (baseImgPanX / 100) * canvas.width;
        const panY = (baseImgPanY / 100) * canvas.height;

        const w = canvas.width * zoom;
        const h = canvas.height * zoom;
        const x = (canvas.width - w) / 2 + panX;
        const y = (canvas.height - h) / 2 + panY;

        ctx.drawImage(baseImg, x, y, w, h);
        ctx.restore();

        // Apply key out background effect if requested
        if (keyOutBackground) {
          // Simple canvas chroma key filter to make white backgrounds of the uploaded image transparent
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            // If close to absolute white, make it transparent
            if (r > 240 && g > 240 && b > 240) {
              data[i+3] = 0; // zero alpha
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }
      } else if (bgType === 'dark') {
        // Draw solid dark background
        ctx.fillStyle = '#070708';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // 5. Draw transparent SvgButterfly with positioning, rotation, and glows
      // Calc size ratio
      const bWidth = canvas.width * (overlayScale / 100);
      const bHeight = bWidth; // square bounding box

      // Calc exact pixel positions
      const rightMargin = canvas.width * (offsetX / 100);
      const topMargin = canvas.height * (offsetY / 100);

      const posX = canvas.width - bWidth - rightMargin;
      const posY = topMargin;

      ctx.save();
      // Translate to center of butterfly
      const centerX = posX + bWidth / 2;
      const centerY = posY + bHeight / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);

      // Optional High resolution dropshadow/glow
      if (enableGlow) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = (canvas.width * (glowSize / 100)) / 2;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Draw vector butterfly
      ctx.drawImage(vectorImg, -bWidth / 2, -bHeight / 2, bWidth, bHeight);
      ctx.restore();

      // 6. Optional badge overlay text rounded container
      if (selectedBadge !== 'none') {
        let badgeText = 'Karma Butterfly';
        if (selectedBadge === 'holder') badgeText = 'Karma Butterfly Holder';
        else if (selectedBadge === 'genesis') badgeText = 'Genesis Butterfly';
        else if (selectedBadge === 'verified') badgeText = 'KarmaScore Verified';

        // Badge size is proportional to canvas height (about 5-6% height)
        const fontHeight = Math.max(14, Math.floor(canvas.height * 0.038));
        ctx.font = `extrabold ${fontHeight}px sans-serif`;
        const textWidth = ctx.measureText(badgeText).width;

        const paddingX = fontHeight * 1.2;
        const paddingY = fontHeight * 0.65;
        const pillWidth = textWidth + paddingX * 2;
        const pillHeight = fontHeight + paddingY * 2;

        // Position bottom center
        const badgeX = (canvas.width - pillWidth) / 2;
        const badgeY = canvas.height - pillHeight - (canvas.height * 0.05); // 5% margin from bottom

        // Draw glossy slate pill background
        ctx.save();
        ctx.fillStyle = 'rgba(10, 10, 11, 0.95)';
        ctx.strokeStyle = '#F59E0B'; // Amber orange stroke
        ctx.lineWidth = Math.max(1, Math.floor(canvas.height * 0.0035));
        
        // Draw rounded path
        const radius = pillHeight / 2;
        ctx.beginPath();
        ctx.moveTo(badgeX + radius, badgeY);
        ctx.lineTo(badgeX + pillWidth - radius, badgeY);
        ctx.arcTo(badgeX + pillWidth, badgeY, badgeX + pillWidth, badgeY + radius, radius);
        ctx.lineTo(badgeX + pillWidth, badgeY + pillHeight - radius);
        ctx.arcTo(badgeX + pillWidth, badgeY + pillHeight, badgeX + pillWidth - radius, badgeY + pillHeight, radius);
        ctx.lineTo(badgeX + radius, badgeY + pillHeight);
        ctx.arcTo(badgeX, badgeY + pillHeight, badgeX, badgeY + pillHeight - radius, radius);
        ctx.lineTo(badgeX, badgeY + radius);
        ctx.arcTo(badgeX, badgeY, badgeX + radius, badgeY, radius);
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke();

        // Draw luxury text
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, badgeX + pillWidth / 2, badgeY + pillHeight / 2 + (fontHeight * 0.05));
        ctx.restore();
      }

      // Convert to dynamic png url
      const finalUrl = canvas.toDataURL('image/png');
      
      // Cleanup blob url
      URL.revokeObjectURL(blobUrl);

      return finalUrl;

    } catch (err) {
      console.error(err);
      alert('An error occurred during composition rendering.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  // Effect to dynamically compile the high-fidelity merged composition image
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const dataUrl = await generateSocialComposition();
        if (dataUrl) {
          setCompositeDataUrl(dataUrl);
        }
      } catch (err) {
        console.error("Auto composition compilation failed", err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [
    uploadedBaseImg,
    bgType,
    overlayScale,
    offsetX,
    offsetY,
    rotation,
    glowSize,
    glowColor,
    enableGlow,
    keyOutBackground,
    selectedBadge,
    detectedAlignment,
    detectedSeed,
    isEvolved,
    baseImgZoom,
    baseImgPanX,
    baseImgPanY
  ]);

  // Gestures and interactions
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // Pinch gesture
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
      setTouchStartZoom(editMode === 'butterfly' ? overlayScale : baseImgZoom);
    } else if (e.touches.length === 1) {
      // Pan gesture
      setIsPanning(true);
      setPanStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      if (editMode === 'butterfly') {
        setPanStartOffset({ x: offsetX, y: offsetY });
      } else {
        setPanStartOffset({ x: baseImgPanX, y: baseImgPanY });
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && touchStartDist !== null) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDist;
      if (editMode === 'butterfly') {
        // Scale butterfly size (range: 5% to 100%)
        const newScale = Math.min(100, Math.max(5, Math.round(touchStartZoom * factor)));
        setOverlayScale(newScale);
      } else {
        // Scale background zoom (range: 1.0 to 4.0)
        const newZoom = Math.min(4.0, Math.max(1.0, parseFloat((touchStartZoom * factor).toFixed(2))));
        setBaseImgZoom(newZoom);
      }
    } else if (e.touches.length === 1 && isPanning) {
      e.preventDefault();
      const dx = e.touches[0].clientX - panStart.x;
      const dy = e.touches[0].clientY - panStart.y;

      const containerWidth = containerRef.current?.clientWidth || 400;
      const containerHeight = containerRef.current?.clientHeight || 400;

      const pctX = (dx / containerWidth) * 100;
      const pctY = (dy / containerHeight) * 100;

      if (editMode === 'butterfly') {
        // Drag butterfly
        const newOffsetX = Math.min(110, Math.max(-50, Math.round(panStartOffset.x - pctX)));
        const newOffsetY = Math.min(110, Math.max(-50, Math.round(panStartOffset.y + pctY)));
        setOffsetX(newOffsetX);
        setOffsetY(newOffsetY);
      } else {
        // Drag background image
        const newPanX = Math.min(200, Math.max(-200, Math.round(panStartOffset.x + pctX)));
        const newPanY = Math.min(200, Math.max(-200, Math.round(panStartOffset.y + pctY)));
        setBaseImgPanX(newPanX);
        setBaseImgPanY(newPanY);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStartDist(null);
    setIsPanning(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    if (editMode === 'butterfly') {
      setPanStartOffset({ x: offsetX, y: offsetY });
    } else {
      setPanStartOffset({ x: baseImgPanX, y: baseImgPanY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    e.preventDefault();
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;

    const containerWidth = containerRef.current?.clientWidth || 400;
    const containerHeight = containerRef.current?.clientHeight || 400;

    const pctX = (dx / containerWidth) * 100;
    const pctY = (dy / containerHeight) * 100;

    if (editMode === 'butterfly') {
      const newOffsetX = Math.min(110, Math.max(-50, Math.round(panStartOffset.x - pctX)));
      const newOffsetY = Math.min(110, Math.max(-50, Math.round(panStartOffset.y + pctY)));
      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
    } else {
      const newPanX = Math.min(200, Math.max(-200, Math.round(panStartOffset.x + pctX)));
      const newPanY = Math.min(200, Math.max(-200, Math.round(panStartOffset.y + pctY)));
      setBaseImgPanX(newPanX);
      setBaseImgPanY(newPanY);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.05 : 0.95;
    if (editMode === 'butterfly') {
      const newScale = Math.min(100, Math.max(5, Math.round(overlayScale * zoomFactor)));
      setOverlayScale(newScale);
    } else {
      const newZoom = Math.min(4.0, Math.max(1.0, parseFloat((baseImgZoom * zoomFactor).toFixed(2))));
      setBaseImgZoom(newZoom);
    }
  };

  const handleDownload = async () => {
    const dataUrl = await generateSocialComposition();
    if (!dataUrl) return;

    // Trigger download
    const link = document.createElement('a');
    link.download = `${imgName}_karma_overlay.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Save overlay to the library tab
    const newItem: SavedOverlay = {
      id: Math.random().toString(36).substring(2, 9),
      name: `${imgName} + 🦋`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dataUrl: dataUrl
    };

    const updated = [newItem, ...savedCreations.slice(0, 11)]; // Cap at 12 items
    setSavedCreations(updated);
    localStorage.setItem('karma_overlay_creations', JSON.stringify(updated));
  };

  // Launch Social Crop modal
  const handleLaunchSocialCrop = async (platform: 'x-pfp' | 'x-banner' | 'tg' | 'discord') => {
    const fullResUrl = await generateSocialComposition();
    if (!fullResUrl) return;

    // Based on platform, draw onto scaled output card
    const sourceImg = new Image();
    sourceImg.onload = () => {
      let targetW = 400;
      let targetH = 400;
      if (platform === 'x-banner') {
        targetW = 1500;
        targetH = 500;
      } else if (platform === 'tg') {
        targetW = 512;
        targetH = 512;
      } else if (platform === 'discord') {
        targetW = 128;
        targetH = 128;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Keep original aspect ratio, crop / fill to fit target boundary
        const imgRatio = sourceImg.width / sourceImg.height;
        const targetRatio = targetW / targetH;
        let drawW = targetW;
        let drawH = targetH;
        let dx = 0;
        let dy = 0;

        if (imgRatio > targetRatio) {
          // wider than target, fit height
          drawW = targetH * imgRatio;
          dx = (targetW - drawW) / 2;
        } else {
          // taller than target, fit width
          drawH = targetW / imgRatio;
          dy = (targetH - drawH) / 2;
        }

        ctx.fillStyle = '#050505'; // background filler black
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(sourceImg, dx, dy, drawW, drawH);

        setSocialModalPreset({
          open: true,
          dataUrl: canvas.toDataURL('image/png'),
          platform
        });
      }
    };
    sourceImg.src = fullResUrl;
  };

  // Quick reset parameters
  const resetOverlayConfigs = () => {
    setOverlayScale(20);
    setOffsetX(3);
    setOffsetY(3);
    setRotation(0);
    setGlowSize(15);
    setEnableGlow(true);
    setSelectedBadge('holder');
  };

  const removeSavedCreation = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const filtered = savedCreations.filter(c => c.id !== id);
    setSavedCreations(filtered);
    localStorage.setItem('karma_overlay_creations', JSON.stringify(filtered));
  };

  return (
    <section id="profile-overlay" className="py-20 relative overflow-hidden bg-[#0A0A0A] border-b border-white/10">
      {/* Absolute ambient lights fitting our luxury design */}
      <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      {/* Hidden container used to serialize scalable vector butterfly structure seamlessly */}
      <div ref={hiddenButterflyRef} className="absolute -left-[5000px] -top-[5000px]">
        <SvgButterfly 
          variant={detectedAlignment} 
          seed={detectedSeed} 
          evolved={isEvolved} 
          flappingSpeed="none" 
          size={500} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content defining the karma story */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-[0.25em] font-extrabold flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
              <span>Identity Customization Suite</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-white tracking-tight">
              Add Floating X Badge
            </h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl">
              Let your karma fly with you everywhere. This utility superimposes your custom high-fidelity generative Karma Butterfly onto your profile picture or favorite digital canvas instantly showing ownership. Add Floating X Badge suite allows seamless badging on the go!
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-[#161617] border border-white/5 p-1 rounded-xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'editor' 
                  ? 'bg-[#F59E0B] text-black shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Add Floating X Badge Generator
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-1.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'library' 
                  ? 'bg-[#F59E0B] text-black shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>My Creations</span>
              {savedCreations.length > 0 && (
                <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                  activeTab === 'library' ? 'bg-black text-[#F59E0B]' : 'bg-amber-500/20 text-[#F59E0B]'
                }`}>
                  {savedCreations.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'editor' ? (
          /* Editor Tab Layout grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Panel: 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Box 1: Wallet Verification / Auto detection */}
              <div className="bg-[#111111]/90 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-xs font-mono font-extrabold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Butterfly Registry Connect</span>
                  </h3>
                  {isConnected ? (
                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold uppercase px-2 py-0.5 rounded">
                      Linked
                    </span>
                  ) : (
                    <span className="text-[9px] bg-slate-500/10 border border-white/10 text-slate-400 font-mono font-bold uppercase px-2 py-0.5 rounded">
                      Unlinked
                    </span>
                  )}
                </div>

                {/* NFT Hold & Wallet Scan Note */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 text-[11px] text-slate-300 leading-relaxed font-sans space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-extrabold uppercase font-mono tracking-wider">
                    <span>⚠️ ON-CHAIN VERIFICATION STATEMENT</span>
                  </div>
                  <p>
                    Normally, this utility dynamically scans connected wallets to verify specific **Karma Butterfly NFT ownership**. Because we are in test/sandbox mode, full access is open to preview and download customized designs on any uploaded custom image or preset.
                  </p>
                </div>

                {isConnected ? (
                  <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-slate-500">DETECTED WALLET</span>
                        <p className="text-slate-100 font-mono text-xs leading-none truncate max-w-[200px]" title={address}>
                          {address.substring(0, 6)}...{address.substring(address.length - 4)}
                        </p>
                      </div>
                      <button 
                        onClick={handleDisconnect}
                        className="text-[9px] font-mono text-rose-400 hover:text-rose-300 underline cursor-pointer"
                      >
                        Disconnect
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 items-center">
                      <div>
                        <span className="text-[9.5px] font-mono text-slate-500 block">ALIGNMENT</span>
                        <span className="text-xs font-sans font-bold capitalize text-white flex items-center gap-1">
                          🦋 {detectedAlignment}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9.5px] font-mono text-slate-500 block">STATUS</span>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">
                          {isEvolved ? '✦ EVOLVED' : '✦ GENESIS'}
                        </span>
                      </div>
                      <button
                        onClick={() => setIsEvolved(!isEvolved)}
                        className="py-1 px-2 text-[8px] bg-neutral-900 border border-white/10 text-slate-350 hover:text-white rounded uppercase font-mono tracking-wider text-center cursor-pointer hover:border-slate-700 transition"
                      >
                        To {isEvolved ? 'Genesis' : 'Evolved'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-slate-400 text-xs">
                      Enter your audited signature address to automatically grab your unique deterministic butterfly membership badge, or connect to retrieve it:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Paste address (0x...)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="flex-1 bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#F59E0B]/50"
                      />
                      <button
                        onClick={handleConnectMock}
                        className="bg-[#F59E0B] text-black px-4 py-2 rounded-xl font-sans font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition cursor-pointer shrink-0 font-extrabold"
                      >
                        Connect
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <button 
                        type="button" 
                        onClick={() => applyPreset('light', false)}
                        className="text-[9.5px] text-slate-500 hover:text-[#34d399] flex items-center gap-1 transition uppercase tracking-wider font-mono font-bold"
                      >
                        <Sliders className="w-3 h-3" /> User Presets
                      </button>
                      <span className="text-[9px] text-[#F59E0B] italic block">No wallet? Click Connect for mock.</span>
                    </div>
                  </div>
                )}

                {/* Preset quick trials */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <button 
                    onClick={() => applyPreset('light', false)}
                    className={`py-1.5 text-[9px] font-mono rounded bg-emerald-950/10 text-[#34d399] border hover:bg-emerald-950/20 ${
                      detectedAlignment === 'light' && !isEvolved ? 'border-[#34d399]/70' : 'border-[#34d399]/10'
                    }`}
                  >
                    Light
                  </button>
                  <button 
                    onClick={() => applyPreset('shadow', false)}
                    className={`py-1.5 text-[9px] font-mono rounded bg-purple-950/10 text-[#c084fc] border hover:bg-purple-950/20 ${
                      detectedAlignment === 'shadow' && !isEvolved ? 'border-[#c084fc]/70' : 'border-[#c084fc]/10'
                    }`}
                  >
                    Shadow
                  </button>
                  <button 
                    onClick={() => applyPreset('nexus', false)}
                    className={`py-1.5 text-[9px] font-mono rounded bg-teal-950/10 text-[#10b981] border hover:bg-teal-950/20 ${
                      detectedAlignment === 'nexus' && !isEvolved ? 'border-[#10b981]/70' : 'border-[#10b981]/10'
                    }`}
                  >
                    Nexus
                  </button>
                  <button 
                    onClick={() => applyPreset('light', true)}
                    className={`py-1.5 text-[9px] font-mono rounded bg-pink-950/10 text-pink-400 border hover:bg-pink-950/20 ${
                      isEvolved ? 'border-pink-400/70' : 'border-pink-400/10'
                    }`}
                  >
                    Evolved
                  </button>
                </div>
              </div>

              {/* Box 2: Image drag drop attachment */}
              <div className="bg-[#111111]/90 border border-white/10 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-mono font-extrabold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-3">
                  <Upload className="w-4 h-4" />
                  <span>Attach Canvas File</span>
                </h3>

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-white/10 hover:border-[#F59E0B]/40 bg-black/40 rounded-xl p-6 text-center transition-all cursor-pointer group space-y-3"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-slate-400 group-hover:text-[#F59E0B] group-hover:bg-amber-950/20 border border-white/5 group-hover:border-[#F59E0B]/20 flex items-center justify-center mx-auto transition-all">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-sans text-white font-bold leading-none">
                      Drag & drop your profile image
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">
                      Supports PNG, JPG, JPEG, WEBP (Square Recommended)
                    </p>
                  </div>
                </div>

                {uploadedBaseImg && (
                  <div className="flex items-center justify-between bg-black/20 p-2.5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 max-w-[70%]">
                      <div className="w-10 h-10 rounded bg-[#1A1A1A] overflow-hidden flex items-center justify-center shrink-0 border border-white/5">
                        <img src={uploadedBaseImg} alt="Uploaded source preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-white truncate text-slate-200 leading-none">{imgName}</p>
                        <span className="text-[8.5px] font-mono text-slate-500 block mt-0.5">Custom base canvas</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedBaseImg(null);
                        setImgName('');
                      }}
                      className="p-1 px-2.5 rounded text-[10px] bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Box 3: Overlay Controllers & badging */}
              <div className="bg-[#111111]/90 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-xs font-mono font-extrabold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" />
                    <span>Fine Tuning Controls</span>
                  </h3>
                  <button
                    onClick={resetOverlayConfigs}
                    className="text-[9.5px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                {/* Control Sliders */}
                <div className="space-y-4 pt-1">
                  {/* Edit Target Selector */}
                  <div className="space-y-2 border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">INTERACTION TARGET</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setEditMode('butterfly')}
                        className={`py-2 px-3 rounded-xl border font-sans font-extrabold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          editMode === 'butterfly'
                            ? 'bg-[#F59E0B]/10 border-[#F59E0B]/50 text-[#F59E0B]'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Move className="w-3.5 h-3.5 shrink-0" />
                        <span>🦋 Butterfly</span>
                      </button>
                      <button
                        onClick={() => setEditMode('background')}
                        className={`py-2 px-3 rounded-xl border font-sans font-extrabold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          editMode === 'background'
                            ? 'bg-[#F59E0B]/10 border-[#F59E0B]/50 text-[#F59E0B]'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Hand className="w-3.5 h-3.5 shrink-0" />
                        <span>🖼️ Background</span>
                      </button>
                    </div>
                    <p className="text-[9.5px] font-mono text-slate-500 text-center leading-normal">
                      💡 Pro-Tip: You can drag, scroll (wheel), or pinch directly on the canvas to move/resize the selected layer!
                    </p>
                  </div>

                  {/* Canvas Background Style selection */}
                  <div className="space-y-2 border-b border-white/5 pb-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">CANVAS BACKGROUND BASE</span>
                    <div className="grid grid-cols-3 gap-2 text-[10px] uppercase font-bold">
                      <button
                        onClick={() => setBgType('transparent')}
                        className={`py-1.5 px-2 rounded-lg border text-center transition cursor-pointer ${
                          bgType === 'transparent'
                            ? 'bg-neutral-800 border-white/30 text-white'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        🏁 Transparent
                      </button>
                      <button
                        onClick={() => setBgType('dark')}
                        className={`py-1.5 px-2 rounded-lg border text-center transition cursor-pointer ${
                          bgType === 'dark'
                            ? 'bg-neutral-800 border-white/30 text-white'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        ◼️ Deep Slate
                      </button>
                      <button
                        disabled={!uploadedBaseImg}
                        onClick={() => setBgType('image')}
                        className={`py-1.5 px-2 rounded-lg border text-center transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
                          bgType === 'image'
                            ? 'bg-neutral-800 border-white/30 text-white'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        🖼️ Photo Base
                      </button>
                    </div>
                  </div>

                  {editMode === 'butterfly' ? (
                    <div className="space-y-4">
                      {/* Size slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">BUTTERFLY SIZE</span>
                          <span className="text-white font-bold">{overlayScale}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setOverlayScale(Math.max(5, overlayScale - 5))}
                            className="p-1 px-2.5 rounded bg-neutral-900 border border-white/5 text-slate-350 hover:text-white text-xs font-mono font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="range"
                            min="5"
                            max="100"
                            value={overlayScale}
                            onChange={(e) => setOverlayScale(parseInt(e.target.value))}
                            className="flex-1 accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                          />
                          <button 
                            onClick={() => setOverlayScale(Math.min(100, overlayScale + 5))}
                            className="p-1 px-2.5 rounded bg-neutral-900 border border-white/5 text-slate-350 hover:text-white text-xs font-mono font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Horizontal Margin */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">HORIZONTAL OFFSET (X)</span>
                          <span className="text-white font-bold">{offsetX}%</span>
                        </div>
                        <input
                          type="range"
                          min="-20"
                          max="90"
                          value={offsetX}
                          onChange={(e) => setOffsetX(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>

                      {/* Vertical Margin */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">VERTICAL OFFSET (Y)</span>
                          <span className="text-white font-bold">{offsetY}%</span>
                        </div>
                        <input
                          type="range"
                          min="-20"
                          max="90"
                          value={offsetY}
                          onChange={(e) => setOffsetY(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>

                      {/* Rotation */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">WING TILT (ROTATION)</span>
                          <span className="text-white font-bold">{rotation}°</span>
                        </div>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          value={rotation}
                          onChange={(e) => setRotation(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Zoom background */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">PHOTO ZOOM</span>
                          <span className="text-white font-bold">{baseImgZoom.toFixed(1)}x</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setBaseImgZoom(Math.max(1.0, parseFloat((baseImgZoom - 0.1).toFixed(2))))}
                            className="p-1 px-2.5 rounded bg-neutral-900 border border-white/5 text-slate-350 hover:text-white text-xs font-mono font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="range"
                            min="1.0"
                            max="4.0"
                            step="0.05"
                            value={baseImgZoom}
                            onChange={(e) => setBaseImgZoom(parseFloat(e.target.value))}
                            className="flex-1 accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                          />
                          <button 
                            onClick={() => setBaseImgZoom(Math.min(4.0, parseFloat((baseImgZoom + 0.1).toFixed(2))))}
                            className="p-1 px-2.5 rounded bg-neutral-900 border border-white/5 text-slate-350 hover:text-white text-xs font-mono font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Pan X */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">PHOTO SHIFT X (PAN)</span>
                          <span className="text-white font-bold">{baseImgPanX}%</span>
                        </div>
                        <input
                          type="range"
                          min="-200"
                          max="200"
                          value={baseImgPanX}
                          onChange={(e) => setBaseImgPanX(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>

                      {/* Pan Y */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10.5px] font-mono">
                          <span className="text-slate-400 uppercase">PHOTO SHIFT Y (PAN)</span>
                          <span className="text-white font-bold">{baseImgPanY}%</span>
                        </div>
                        <input
                          type="range"
                          min="-200"
                          max="200"
                          value={baseImgPanY}
                          onChange={(e) => setBaseImgPanY(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {/* Optional Glow controller */}
                  <div className="pt-2 border-t border-white/5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enableGlow}
                          onChange={(e) => setEnableGlow(e.target.checked)}
                          className="rounded border-white/10 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                        <span>Enable Butterfly Halo Glow</span>
                      </label>
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20 transition-all"
                        style={{ backgroundColor: glowColor, boxShadow: `0 0 10px ${glowColor}` }}
                      />
                    </div>

                    {enableGlow && (
                      <div className="space-y-1 bg-black/30 p-2.5 rounded-lg border border-white/5">
                        <div className="flex justify-between text-[9.5px] font-mono">
                          <span className="text-slate-500 uppercase">GLOW INTENSITY</span>
                          <span className="text-slate-300 font-bold">{glowSize}%</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="35"
                          value={glowSize}
                          onChange={(e) => setGlowSize(parseInt(e.target.value))}
                          className="w-full accent-[#F59E0B] cursor-pointer h-1 bg-[#1A1A1A] rounded-lg"
                        />
                        <div className="flex gap-1.5 mt-2 overflow-x-auto justify-between pt-1">
                          {['#F59E0B', '#34d399', '#c084fc', '#10b981', '#fb923c', '#ffffff'].map(c => (
                            <button
                              key={c}
                              onClick={() => setGlowColor(c)}
                              className={`w-4 h-4 rounded-full cursor-pointer transition border ${
                                glowColor === c ? 'border-white scale-110' : 'border-white/10'
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Auto-remove white background tool */}
                  <div className="pt-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={keyOutBackground}
                        onChange={(e) => setKeyOutBackground(e.target.checked)}
                        className="rounded border-white/10 text-[#F59E0B] focus:ring-0"
                      />
                      <span>Key Out White Backgrounds (For PFP uploads)</span>
                    </label>
                    <p className="text-[9px] font-mono text-slate-500 mt-1 leading-normal pl-5">
                      Check this option if your uploaded custom image has an solid white background you wish to transparentify.
                    </p>
                  </div>

                  {/* Optional Badge picker */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">CHOOSE BRAND BADGE OVERLAY</span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[
                        { id: 'none', label: 'No Badge' },
                        { id: 'holder', label: '🦋 Karma Holder' },
                        { id: 'genesis', label: '✦ Genesis Pill' },
                        { id: 'verified', label: '✓ Karma Verified' },
                      ].map(b => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBadge(b.id as any)}
                          className={`py-1.5 px-2.5 rounded-lg border text-left font-sans font-bold text-[10px] uppercase tracking-wider transition ${
                            selectedBadge === b.id 
                              ? 'bg-neutral-800 border-[#F59E0B]/50 text-[#F59E0B]' 
                              : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Live Render/Preview panel: 7 columns */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Box: Canvas Studio Board */}
              <div className="bg-[#111111]/90 border border-white/10 rounded-2xl p-5 md:p-6 sm:p-8 flex flex-col justify-between items-center relative min-h-[460px]">
                
                {/* Header info */}
                <div className="w-full flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                  <div>
                    <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest block font-extrabold">LIVE PREVIEW</span>
                    <p className="text-slate-500 font-sans text-xs italic leading-none mt-1">
                      “Let your karma fly with you everywhere”
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={resetOverlayConfigs}
                      title="Reset Position"
                      className="p-1 px-2 text-[10px] bg-neutral-900 border border-white/5 hover:border-slate-800 text-slate-400 hover:text-white rounded font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer transition"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                </div>

                {/* Main Composition Canvas Preview Box */}
                <div 
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onWheel={handleWheel}
                  className={`relative w-full max-w-[340px] md:max-w-[400px] aspect-square rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden shadow-inner transition-all select-none ${
                    bgType === 'transparent'
                      ? 'bg-[linear-gradient(45deg,#161617_25%,transparent_25%),linear-gradient(-45deg,#161617_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#161617_75%),linear-gradient(-45deg,transparent_75%,#161617_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0] bg-[#070708]'
                      : bgType === 'dark'
                      ? 'bg-[#0B0B0C]'
                      : 'bg-[#070708]'
                  }`}
                >
                  {bgType === 'image' && !uploadedBaseImg ? (
                    <div className="text-center p-8 space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/5 border border-[#F59E0B]/20 flex items-center justify-center text-4xl mx-auto animate-bounce duration-1000">
                        📸
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-white font-black uppercase tracking-widest">No Base Image Selected</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-[240px] mx-auto">
                          Attach your profile photo to begin layering, or switch canvas background to Transparent / Deep Slate above.
                        </p>
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="py-1.5 px-3 bg-[#F59E0B] hover:bg-amber-400 text-black rounded-lg text-[10px] uppercase font-mono tracking-widest font-extrabold cursor-pointer"
                      >
                        Browse Photo ↗
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                      
                      {/* Base Image */}
                      {bgType === 'image' && uploadedBaseImg && (
                        <div 
                          className="w-full h-full transition-transform duration-75 pointer-events-none"
                          style={{
                            transform: `scale(${baseImgZoom}) translate(${baseImgPanX}%, ${baseImgPanY}%)`,
                          }}
                        >
                          <img 
                            src={uploadedBaseImg} 
                            alt="Workspace Base" 
                            className={`w-full h-full object-cover rounded-xl ${
                              keyOutBackground ? 'bg-slate-900 shadow-xl' : ''
                            }`} 
                          />
                        </div>
                      )}

                      {/* Floating Vector Butterfly Overlay */}
                      <div 
                        className="absolute cursor-move select-none active:scale-[1.02] transition-transform"
                        style={{
                          top: `${offsetY}%`,
                          right: `${offsetX}%`,
                          width: `${overlayScale}%`,
                          height: `${overlayScale}%`,
                          transform: `rotate(${rotation}deg)`,
                          filter: enableGlow ? `drop-shadow(0 0 ${glowSize}px ${glowColor})` : 'none',
                          transition: 'filter 0.3s ease, width 0.1s ease, height 0.1s ease'
                        }}
                      >
                        <div className="w-full h-full">
                          <SvgButterfly 
                            variant={detectedAlignment} 
                            seed={detectedSeed} 
                            evolved={isEvolved} 
                            flappingSpeed="normal" 
                            size={120} // Automatically resizable by container percentage width
                            className="w-full h-full"
                          />
                        </div>
                      </div>

                      {/* Brand Pill badge overlay */}
                      {selectedBadge !== 'none' && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/95 text-white border border-[#F59E0B] px-3.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider shadow-lg flex items-center gap-1 animate-pulse-glow z-10">
                          <BadgeCheck className="w-3 h-3 text-[#F59E0B] shrink-0" />
                          <span>
                            {selectedBadge === 'holder' && 'Karma Butterfly Holder'}
                            {selectedBadge === 'genesis' && 'Genesis Butterfly'}
                            {selectedBadge === 'verified' && 'KarmaScore Verified'}
                          </span>
                        </div>
                      )}

                      {/* Tap to save composite hover-overlay */}
                      {compositeDataUrl && !isPanning && (
                        <div 
                          onClick={handleDownload}
                          className="absolute inset-0 w-full h-full cursor-pointer z-20 group"
                          title="Tap/Click to save composite"
                        >
                          {/* We can overlay a subtle interactive ring or tooltip on hover */}
                          <div className="absolute inset-0 bg-amber-500/0 hover:bg-amber-500/5 transition-all flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 bg-black/90 border border-[#F59E0B]/50 px-3 py-1.5 rounded-lg text-[9px] font-mono text-[#F59E0B] tracking-wider uppercase shadow-xl transition-all scale-95 group-hover:scale-100">
                              📲 Tap / Click to download
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Preconfigured Cross-Platform Presets Actions footer */}
                <div className="w-full mt-6 space-y-3 pt-4 border-t border-white/5">
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      disabled={isGenerating || (bgType === 'image' && !uploadedBaseImg)}
                      onClick={handleDownload}
                      className="flex-1 py-3 bg-[#F59E0B] disabled:bg-amber-500/10 disabled:text-slate-500 disabled:cursor-not-allowed text-black rounded-xl text-xs font-sans font-black uppercase tracking-widest flex items-center justify-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-amber-500/10 font-extrabold"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Rendering...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Creation</span>
                        </>
                      )}
                    </button>
                  </div>

                  {(uploadedBaseImg || bgType !== 'image') && (
                    <div className="space-y-2">
                      <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block text-center">Export Custom Platform Crop Size presets:</span>
                      <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-mono text-slate-300">
                        <button
                          onClick={() => handleLaunchSocialCrop('x-pfp')}
                          className="py-1.5 bg-neutral-900 border border-white/5 hover:border-sky-500/40 rounded hover:text-sky-400 transition"
                        >
                          X Profile
                        </button>
                        <button
                          onClick={() => handleLaunchSocialCrop('x-banner')}
                          className="py-1.5 bg-neutral-900 border border-white/5 hover:border-sky-500/40 rounded hover:text-sky-400 transition"
                        >
                          X Banner
                        </button>
                        <button
                          onClick={() => handleLaunchSocialCrop('tg')}
                          className="py-1.5 bg-neutral-900 border border-white/5 hover:border-cyan-500/40 rounded hover:text-cyan-400 transition"
                        >
                          TG Avatar
                        </button>
                        <button
                          onClick={() => handleLaunchSocialCrop('discord')}
                          className="py-1.5 bg-neutral-900 border border-white/5 hover:border-indigo-500/40 rounded hover:text-indigo-400 transition"
                        >
                          Discord
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
              
            </div>

          </div>
        ) : (
          /* Creations Library Tab */
          <div className="bg-[#111111]/90 border border-white/10 rounded-2xl p-6 min-h-[460px]">
            {savedCreations.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {savedCreations.map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-[#161617] border border-white/5 rounded-xl overflow-hidden relative shadow-md hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="aspect-square bg-slate-900 relative">
                      <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover" />
                      
                      {/* Action hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <button
                          onClick={(e) => removeSavedCreation(item.id, e)}
                          className="self-end p-1 rounded bg-rose-500/80 text-white hover:bg-rose-500 transition cursor-pointer"
                          title="Delete from library"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={item.dataUrl}
                          download={`${item.name}_download.png`}
                          className="w-full text-center bg-[#F59E0B] text-black rounded py-1 text-[9px] font-mono uppercase tracking-wider font-extrabold flex items-center justify-center gap-1 transition shrink-0"
                        >
                          <Download className="w-2.5 h-2.5" /> Png
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-neutral-900/60 flex flex-col gap-0.5">
                      <p className="text-[10px] font-sans font-bold text-white truncate leading-tight">{item.name}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-slate-500 block">{item.timestamp}</span>
                        <span className="text-[8px] font-mono text-[#F59E0B] font-bold">SAVED</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 bg-neutral-900 border border-white/5 flex items-center justify-center rounded-2xl text-3xl mx-auto shadow-inner">
                  📁
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-tight uppercase">Creations Ledger Empty</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto mt-1">
                    Your generated and saved profile badges will show up here. Open the Generator to compose your first image preset!
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('editor')}
                  className="py-1.5 px-4 bg-transparent border border-white/10 hover:border-amber-500/30 text-white rounded-lg text-[10px] uppercase font-mono tracking-wider cursor-pointer"
                >
                  Generate Badge Now
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Social crop export modal with quick steps */}
      {socialModalPreset.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all">
          <div className="w-full max-w-md bg-[#161617] border border-amber-500/40 rounded-2xl p-6 shadow-[0_20px_50px_rgba(245,158,11,0.2)] relative space-y-4">
            
            <button
              onClick={() => setSocialModalPreset({ open: false, dataUrl: null, platform: 'x-pfp' })}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[8.5px] font-mono text-[#F59E0B] uppercase tracking-[0.2em] font-extrabold block">Platform crop engine</span>
              <h4 className="text-base font-sans font-black text-white tracking-tight mt-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>
                  {socialModalPreset.platform === 'x-pfp' && 'X (Twitter) Profile Layout'}
                  {socialModalPreset.platform === 'x-banner' && 'X (Twitter) Banner Aspect Ratio'}
                  {socialModalPreset.platform === 'tg' && 'Telegram Profile Identity'}
                  {socialModalPreset.platform === 'discord' && 'Discord Avatar Format'}
                </span>
              </h4>
            </div>

            <div className="bg-[#050505] p-3 rounded-xl border border-white/5 flex items-center justify-center">
              <div 
                className={`overflow-hidden max-w-[280px] border border-white/15 bg-slate-950 ${
                  socialModalPreset.platform === 'x-banner' ? 'w-full aspect-[3/1]' : 'aspect-square rounded-full'
                }`}
              >
                {socialModalPreset.dataUrl && (
                  <img 
                    src={socialModalPreset.dataUrl} 
                    alt="Social preset outline" 
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>
            </div>

            {/* Instruction steps */}
            <div className="text-left space-y-1 bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block font-extrabold">INSTRUCTIONS</span>
              <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                {socialModalPreset.platform === 'x-banner' 
                  ? 'Your landscape crop has been fit to 1500x500 pixels. Use this banner on your Twitter page to represent the swarm campaign.'
                  : 'Your profile avatar has been compiled and centered. Download this file to set it directly as your new crypto avatar.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => setSocialModalPreset({ open: false, dataUrl: null, platform: 'x-pfp' })}
                className="py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/5 font-sans font-bold uppercase tracking-wider rounded-xl transition text-center cursor-pointer"
              >
                Cancel
              </button>
              {socialModalPreset.dataUrl && (
                <a
                  href={socialModalPreset.dataUrl}
                  download={`karma_${socialModalPreset.platform}_export.png`}
                  onClick={() => setSocialModalPreset({ open: false, dataUrl: null, platform: 'x-pfp' })}
                  className="py-2.5 bg-[#F59E0B] hover:bg-amber-400 text-black font-sans font-black uppercase tracking-widest rounded-xl transition text-center flex items-center justify-center gap-1 cursor-pointer font-extrabold"
                >
                  <Download className="w-3.5 h-3.5" /> Save Image
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
