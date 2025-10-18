# AgriFundi Image Assets

Complete reference for all images used in the AgriFundi mobile application.

## Welcome Carousel Images

### Slide 1: Manage Your Equipment
- **Source**: Unsplash
- **URL**: `https://images.unsplash.com/photo-1665152998573-9ddafb89278f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBlcXVpcG1lbnQlMjBleGNhdmF0b3J8ZW58MXx8fHwxNzYwNjc2MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080`
- **Search Query**: "construction equipment excavator"
- **Dimensions**: 1080px width
- **Format**: JPEG
- **Quality**: 80
- **Usage**: First welcome screen showing equipment management
- **Description**: Construction equipment/excavator representing farm machinery

### Slide 2: Quick Diagnostics
- **Source**: Unsplash
- **URL**: `https://images.unsplash.com/photo-1740240993282-6f3b51bd8314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMG1hY2hpbmVyeSUyMG1haW50ZW5hbmNlfGVufDF8fHx8MTc2MDY3NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080`
- **Search Query**: "heavy machinery maintenance"
- **Dimensions**: 1080px width
- **Format**: JPEG
- **Quality**: 80
- **Usage**: Second welcome screen showing diagnostic capabilities
- **Description**: Heavy machinery maintenance scene

### Slide 3: Smart Work Orders
- **Source**: Unsplash
- **URL**: `https://images.unsplash.com/photo-1523705480679-b5d0cc17a656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWludGVuYW5jZSUyMGNoZWNrbGlzdCUyMGNsaXBib2FyZHxlbnwxfHx8fDE3NjA2Nzc0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080`
- **Search Query**: "maintenance checklist clipboard"
- **Dimensions**: 1080px width
- **Format**: JPEG
- **Quality**: 80
- **Usage**: Third welcome screen showing work order management
- **Description**: Maintenance checklist on clipboard

---

## Image Download Instructions

### Method 1: Direct Download
You can download each image directly from the URLs provided above by:
1. Copy the full URL
2. Paste into your browser
3. Right-click and "Save Image As..."
4. Save with descriptive filename (e.g., `welcome-slide-1-equipment.jpg`)

### Method 2: Batch Download Script

Create a file called `download-images.sh`:

```bash
#!/bin/bash

# Create images directory
mkdir -p agrifundi-images

# Download Slide 1
curl -o agrifundi-images/slide-1-equipment.jpg "https://images.unsplash.com/photo-1665152998573-9ddafb89278f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBlcXVpcG1lbnQlMjBleGNhdmF0b3J8ZW58MXx8fHwxNzYwNjc2MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080"

# Download Slide 2
curl -o agrifundi-images/slide-2-diagnostics.jpg "https://images.unsplash.com/photo-1740240993282-6f3b51bd8314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMG1hY2hpbmVyeSUyMG1haW50ZW5hbmNlfGVufDF8fHx8MTc2MDY3NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080"

# Download Slide 3
curl -o agrifundi-images/slide-3-work-orders.jpg "https://images.unsplash.com/photo-1523705480679-b5d0cc17a656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWludGVuYW5jZSUyMGNoZWNrbGlzdCUyMGNsaXBib2FyZHxlbnwxfHx8fDE3NjA2Nzc0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"

echo "All images downloaded to agrifundi-images/"
```

Then run:
```bash
chmod +x download-images.sh
./download-images.sh
```

### Method 3: Python Script

Create a file called `download-images.py`:

```python
import requests
import os

# Create directory
os.makedirs('agrifundi-images', exist_ok=True)

images = [
    {
        'url': 'https://images.unsplash.com/photo-1665152998573-9ddafb89278f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBlcXVpcG1lbnQlMjBleGNhdmF0b3J8ZW58MXx8fHwxNzYwNjc2MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'filename': 'slide-1-equipment.jpg'
    },
    {
        'url': 'https://images.unsplash.com/photo-1740240993282-6f3b51bd8314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMG1hY2hpbmVyeSUyMG1haW50ZW5hbmNlfGVufDF8fHx8MTc2MDY3NjE1OHww&ixlib=rb-4.1.0&q=80&w=1080',
        'filename': 'slide-2-diagnostics.jpg'
    },
    {
        'url': 'https://images.unsplash.com/photo-1523705480679-b5d0cc17a656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWludGVuYW5jZSUyMGNoZWNrbGlzdCUyMGNsaXBib2FyZHxlbnwxfHx8fDE3NjA2Nzc0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'filename': 'slide-3-work-orders.jpg'
    }
]

for img in images:
    print(f"Downloading {img['filename']}...")
    response = requests.get(img['url'])
    if response.status_code == 200:
        with open(f"agrifundi-images/{img['filename']}", 'wb') as f:
            f.write(response.content)
        print(f"✓ {img['filename']} downloaded successfully")
    else:
        print(f"✗ Failed to download {img['filename']}")

print("\nAll images downloaded to agrifundi-images/")
```

Then run:
```bash
python download-images.py
```

---

## Icon System

The app uses **Lucide React** icons throughout. No custom icon files are needed as they are imported from the package.

### Common Icons Used:
- `ArrowLeft` - Navigation back
- `Bell` - Notifications
- `User` - Profile/Customer
- `Search` - Search functionality
- `FileText` - Work Orders
- `Truck` - Tractors/Equipment
- `Users` - Customers
- `Wrench` - Services/Maintenance
- `Calendar` - Dates/Scheduling
- `AlertCircle` - Priority indicators
- `CheckCircle2` - Completed status
- `Clock` - Time/Duration
- `Banknote` - Pricing
- `Settings` - Settings/Maintenance
- `Zap` - Diagnostics
- `MapPin` - Location
- `Phone` - Contact
- `Mail` - Email
- `Star` - Ratings
- `Building2` - Company
- `UserCircle` - User profile
- `ChevronRight` - Navigation forward
- `Sparkles` - Coming soon indicator

---

## Logo/Brand Icon

### SVG Icon (Embedded in App.tsx)
The AgriFundi logo is a custom SVG embedded directly in the code:

```svg
<svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"
  className="w-11 h-11 text-primary-foreground"
>
  <path d="M14 7h6m0 0v6m0-6L10 17M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
</svg>
```

**Styling:**
- Container: 80px × 80px rounded square with 32px border radius
- Background: Primary color (#F3B14E)
- Icon color: Primary foreground (#02007B)
- Border: 4px solid primary/20
- Shadow: Extra large shadow

---

## Image Optimization Recommendations

### For Production Use:
1. **Convert to WebP** for better compression
2. **Generate multiple sizes** for responsive images:
   - Mobile: 640px width
   - Tablet: 1024px width
   - Desktop: 1920px width
3. **Lazy loading** - Images load as needed
4. **Placeholder images** - Use blur-up technique
5. **CDN hosting** - Host on a CDN for faster delivery

### Recommended Tools:
- **Squoosh** (squoosh.app) - Image compression
- **ImageOptim** - Lossless optimization
- **Sharp** (Node.js) - Automated image processing
- **Cloudinary** - CDN with automatic optimization

---

## Image Attribution

All images are sourced from **Unsplash** and are used under the Unsplash License:
- Free to use for commercial and non-commercial purposes
- No permission needed (though attribution is appreciated)
- License: https://unsplash.com/license

### Attribution Template:
```
Photo by [Photographer Name] on Unsplash
https://unsplash.com/photos/[photo-id]
```

To find photographer information:
1. Visit the image URL in a browser
2. Click on "View on Unsplash"
3. Copy photographer name and photo link

---

## Future Image Needs

### Recommended Additional Images:
1. **Tractor placeholder images** - For tractor details without photos
2. **User avatars** - Default profile pictures
3. **Service category icons** - Custom illustrations for service types
4. **Empty state illustrations** - For empty lists/screens
5. **Success/error illustrations** - For feedback messages

### Suggested Sources:
- **unDraw** (undraw.co) - Free customizable illustrations
- **Pexels** (pexels.com) - Free stock photos
- **Icons8 Illustrations** - Professional illustrations
- **Freepik** - Vector illustrations (attribution required)

---

*Last Updated: October 17, 2025*
*Version: 1.0*
