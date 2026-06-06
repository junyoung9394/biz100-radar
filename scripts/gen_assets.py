#!/usr/bin/env python3
"""Generate app icons and splash screens for Biz100 Radar Android app."""

import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RES = os.path.join(BASE, "android/app/src/main/res")

BG_COLOR = "#1a1f2e"       # 딥 네이비
ACCENT = "#3b82f6"         # 블루
TEXT_COLOR = "#ffffff"
SUB_COLOR = "#93c5fd"      # 연한 블루


def draw_rounded_rect(draw, xy, radius, fill):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill)


def make_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 배경 라운드 사각형
    radius = size // 5
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=BG_COLOR)

    # 파란 강조 바 (상단)
    bar_h = max(4, size // 16)
    draw.rounded_rectangle([size // 8, size // 8, size * 7 // 8, size // 8 + bar_h],
                           radius=bar_h // 2, fill=ACCENT)

    # "B100" 텍스트
    font_size = size // 4
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", size // 8)
    except Exception:
        font = ImageFont.load_default()
        small_font = font

    text = "B100"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (size - tw) // 2
    ty = size // 2 - th // 2 - size // 16
    draw.text((tx, ty), text, font=font, fill=TEXT_COLOR)

    # "RADAR" 서브텍스트
    sub = "RADAR"
    sbbox = draw.textbbox((0, 0), sub, font=small_font)
    sw = sbbox[2] - sbbox[0]
    draw.text(((size - sw) // 2, ty + th + size // 20), sub, font=small_font, fill=SUB_COLOR)

    # 하단 점 3개 (레이더 이미지 암시)
    dot_r = max(3, size // 24)
    dot_y = size * 13 // 16
    for i, color in enumerate([ACCENT, SUB_COLOR, TEXT_COLOR]):
        dot_x = size // 2 + (i - 1) * dot_r * 3
        draw.ellipse([dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r], fill=color)

    return img


def make_splash(w, h):
    img = Image.new("RGB", (w, h), BG_COLOR)
    draw = ImageDraw.Draw(img)

    cx, cy = w // 2, h // 2

    try:
        font_l = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", min(w, h) // 8)
        font_s = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", min(w, h) // 18)
    except Exception:
        font_l = ImageFont.load_default()
        font_s = font_l

    # 강조선
    line_h = max(3, min(w, h) // 60)
    line_w = min(w, h) // 3
    draw.rounded_rectangle([cx - line_w // 2, cy - min(w, h) // 6 - line_h * 2,
                             cx + line_w // 2, cy - min(w, h) // 6],
                           radius=line_h, fill=ACCENT)

    text = "Biz100 Radar"
    bbox = draw.textbbox((0, 0), text, font=font_l)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy - th // 2), text, font=font_l, fill=TEXT_COLOR)

    sub = "공식자료 기반 기업정보"
    sbbox = draw.textbbox((0, 0), sub, font=font_s)
    sw = sbbox[2] - sbbox[0]
    draw.text((cx - sw // 2, cy + th // 2 + min(w, h) // 30), sub, font=font_s, fill=SUB_COLOR)

    return img


# ── 아이콘 크기 정의 ──────────────────────────────────────────
ICON_SIZES = {
    "mipmap-mdpi":    48,
    "mipmap-hdpi":    72,
    "mipmap-xhdpi":   96,
    "mipmap-xxhdpi":  144,
    "mipmap-xxxhdpi": 192,
}

FOREGROUND_SIZES = {
    "mipmap-mdpi":    108,
    "mipmap-hdpi":    162,
    "mipmap-xhdpi":   216,
    "mipmap-xxhdpi":  324,
    "mipmap-xxxhdpi": 432,
}

# ── 스플래시 크기 정의 ────────────────────────────────────────
SPLASH_SIZES = {
    "drawable":               (480,  800),
    "drawable-port-mdpi":     (480,  800),
    "drawable-port-hdpi":     (720,  1280),
    "drawable-port-xhdpi":    (960,  1600),
    "drawable-port-xxhdpi":   (1280, 1920),
    "drawable-port-xxxhdpi":  (1440, 2560),
    "drawable-land-mdpi":     (800,  480),
    "drawable-land-hdpi":     (1280, 720),
    "drawable-land-xhdpi":    (1600, 960),
    "drawable-land-xxhdpi":   (1920, 1280),
    "drawable-land-xxxhdpi":  (2560, 1440),
}

print("Generating icons...")
for folder, size in ICON_SIZES.items():
    icon = make_icon(size)
    icon_rgb = Image.new("RGB", icon.size, BG_COLOR)
    icon_rgb.paste(icon, mask=icon.split()[3])
    path = os.path.join(RES, folder, "ic_launcher.png")
    icon_rgb.save(path)
    path_round = os.path.join(RES, folder, "ic_launcher_round.png")
    # 라운드 아이콘: 원형 마스크
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size - 1, size - 1], fill=255)
    round_img = Image.new("RGB", (size, size), BG_COLOR)
    round_img.paste(icon_rgb, mask=mask)
    round_img.save(path_round)
    print(f"  {folder}/ic_launcher.png ({size}px)")

print("Generating foreground icons...")
for folder, size in FOREGROUND_SIZES.items():
    icon = make_icon(size)
    path = os.path.join(RES, folder, "ic_launcher_foreground.png")
    icon.save(path)
    print(f"  {folder}/ic_launcher_foreground.png ({size}px)")

print("Generating splash screens...")
for folder, (w, h) in SPLASH_SIZES.items():
    splash = make_splash(w, h)
    path = os.path.join(RES, folder, "splash.png")
    splash.save(path)
    print(f"  {folder}/splash.png ({w}x{h})")

print("\nDone!")
