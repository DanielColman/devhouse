#!/bin/bash

# DEV HOUSE - Image Optimization Script
# Convierte imágenes JPG/PNG a WebP optimizado

echo "🚀 Optimizando imágenes para DEV HOUSE..."

# Crear directorio de imágenes optimizadas si no existe
mkdir -p images/optimized

# Función para optimizar imagen
optimize_image() {
    local input=$1
    local output=$2
    local width=$3
    local height=$4
    
    echo "📸 Optimizando: $input"
    
    # Convertir a WebP con calidad 85% y redimensionar
    if command -v cwebp &> /dev/null; then
        cwebp -q 85 -resize $width $height "$input" -o "$output"
    elif command -v convert &> /dev/null; then
        convert "$input" -resize "${width}x${height}" -quality 85 "$output"
    else
        echo "❌ Error: Necesitas instalar cwebp o ImageMagick"
        exit 1
    fi
    
    echo "✅ Optimizado: $output"
}

# Optimizar logo (45x45 para header)
optimize_image "images/devHouseICO.png" "images/devHouseICO.webp" 45 45

# Optimizar imágenes de contenido (534px de ancho)
optimize_image "images/pic01.jpg" "images/pic01.webp" 534 729
optimize_image "images/pic02.jpg" "images/pic02.webp" 534 801
optimize_image "images/pic03.jpg" "images/pic03.webp" 534 801

# Optimizar banner si existe
if [ -f "images/banner.jpg" ]; then
    optimize_image "images/banner.jpg" "images/banner.webp" 1200 800
fi

echo "🎉 ¡Optimización completada!"
echo "📊 Reducción estimada de tamaño: 60-80%"
echo "⚡ Mejora en velocidad de carga: Significativa" 