"""生成 ESCore 文档站所需的占位截图与社交分享图。

用法（在 DOC 目录）：
    python scripts/generate-assets.py

截图占位图生成后可直接用同名文件覆盖：
    static/img/screenshots/windows/*.png
    static/img/screenshots/app/*.png
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "static" / "img"
WIN_DIR = IMG_DIR / "screenshots" / "windows"
APP_DIR = IMG_DIR / "screenshots" / "app"
FONT_REGULAR = "C:/Windows/Fonts/msyh.ttc"
FONT_BOLD = "C:/Windows/Fonts/msyhbd.ttc"

CYAN = (34, 211, 238)
BLUE = (59, 130, 246)
VIOLET = (139, 92, 246)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def vertical_gradient(size: tuple[int, int], top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size)
    pixels = image.load()
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(round(top[i] + (bottom[i] - top[i]) * ratio) for i in range(3))
        for x in range(width):
            pixels[x, y] = color
    return image


def add_glow(image: Image.Image, center: tuple[int, int], radius: int, color: tuple[int, int, int], alpha: int) -> None:
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    x, y = center
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(*color, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(radius // 2))
    image.alpha_composite(layer)


def add_grid(draw: ImageDraw.ImageDraw, size: tuple[int, int], step: int = 56) -> None:
    width, height = size
    for x in range(0, width, step):
        draw.line((x, 0, x, height), fill=(148, 163, 184, 16), width=1)
    for y in range(0, height, step):
        draw.line((0, y, width, y), fill=(148, 163, 184, 16), width=1)


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill=None, outline=None, width=1) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_window_chrome(image: Image.Image, title: str, accent: tuple[int, int, int]) -> None:
    draw = ImageDraw.Draw(image, "RGBA")
    rounded(draw, (74, 68, 1366, 832), 24, fill=(8, 15, 29, 248), outline=(71, 85, 105, 120), width=2)
    rounded(draw, (74, 68, 1366, 126), 24, fill=(15, 23, 42, 252))
    draw.rectangle((74, 108, 1366, 126), fill=(15, 23, 42, 252))
    draw.line((74, 126, 1366, 126), fill=(71, 85, 105, 110), width=1)

    for i, color in enumerate(((248, 113, 113), (251, 191, 36), (74, 222, 128))):
        cx = 106 + i * 24
        draw.ellipse((cx - 6, 92 - 6, cx + 6, 92 + 6), fill=(*color, 235))
    draw.text((190, 82), title, font=font(20, True), fill=(226, 232, 240, 255))
    draw.text((1250, 83), "—  □  ×", font=font(18), fill=(148, 163, 184, 220))

    # 左侧导航骨架
    rounded(draw, (74, 126, 292, 832), 0, fill=(10, 18, 34, 252))
    draw.line((292, 126, 292, 832), fill=(71, 85, 105, 90), width=1)
    draw.ellipse((104, 158, 142, 196), fill=(*accent, 60), outline=(*accent, 200), width=2)
    draw.text((154, 166), "ESCore", font=font(21, True), fill=(241, 245, 249, 255))
    for index, width in enumerate((92, 68, 112, 84, 100)):
        y = 250 + index * 54
        active = index == 0
        if active:
            rounded(draw, (94, y - 12, 272, y + 26), 10, fill=(*accent, 34))
        draw.ellipse((108, y, 122, y + 14), fill=(*accent, 210) if active else (100, 116, 139, 120))
        draw.rounded_rectangle((136, y + 2, 136 + width, y + 12), 5, fill=(148, 163, 184, 210 if active else 90))


def dashed_box(draw: ImageDraw.ImageDraw, box, color, radius=20, dash=14, gap=10, width=3) -> None:
    x1, y1, x2, y2 = box
    rounded(draw, box, radius, outline=(*color, 110), width=width)
    # 四角强调，明确这是可替换区域
    length = 54
    for sx, sy, dx, dy in ((x1, y1, 1, 0), (x2, y1, -1, 0), (x1, y2, 1, 0), (x2, y2, -1, 0)):
        draw.line((sx, sy, sx + dx * length, sy + dy * length), fill=(*color, 245), width=width + 1)
    for sx, sy, dx, dy in ((x1, y1, 0, 1), (x2, y1, 0, 1), (x1, y2, 0, -1), (x2, y2, 0, -1)):
        draw.line((sx, sy, sx + dx * length, sy + dy * length), fill=(*color, 245), width=width + 1)


def draw_monitor_icon(draw: ImageDraw.ImageDraw, center: tuple[int, int], accent) -> None:
    x, y = center
    rounded(draw, (x - 42, y - 34, x + 42, y + 22), 10, fill=(*accent, 28), outline=(*accent, 210), width=3)
    draw.line((x - 18, y + 42, x + 18, y + 42), fill=(*accent, 230), width=5)
    draw.line((x, y + 22, x, y + 42), fill=(*accent, 230), width=5)
    draw.ellipse((x - 5, y - 9, x + 5, y + 1), fill=(*accent, 235))


def desktop_placeholder(filename: str, index: str, title: str, subtitle: str, accent) -> None:
    width, height = 1440, 900
    image = vertical_gradient((width, height), (5, 10, 22), (9, 18, 35)).convert("RGBA")
    add_glow(image, (1180, 120), 360, accent, 56)
    add_glow(image, (190, 760), 280, BLUE, 34)
    grid = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    add_grid(ImageDraw.Draw(grid), (width, height), 64)
    image.alpha_composite(grid)
    draw_window_chrome(image, "ESCore Desktop · 软件截图占位", accent)
    draw = ImageDraw.Draw(image, "RGBA")

    dashed_box(draw, (340, 190, 1300, 760), accent)
    draw_monitor_icon(draw, (820, 382), accent)
    draw.text((820, 462), title, font=font(34, True), fill=(241, 245, 249, 255), anchor="mm")
    draw.text((820, 514), subtitle, font=font(20), fill=(148, 163, 184, 255), anchor="mm")
    draw.text((820, 572), f"替换文件：static/img/screenshots/windows/{filename}", font=font(18), fill=(*accent, 245), anchor="mm")
    rounded(draw, (742, 620, 898, 662), 21, fill=(*accent, 26), outline=(*accent, 160), width=1)
    draw.text((820, 641), index, font=font(16, True), fill=(*accent, 255), anchor="mm")

    draw.text((100, 790), "ESCore", font=font(58, True), fill=(241, 245, 249, 255))
    draw.text((104, 852), "企业实时通信框架 · Windows 桌面端", font=font(18), fill=(148, 163, 184, 235))
    draw.text((1240, 848), "PLACEHOLDER", font=font(17, True), fill=(*accent, 230))
    image.convert("RGB").save(WIN_DIR / filename, "PNG", optimize=True)


def app_placeholder(filename: str, index: str, title: str, subtitle: str, accent) -> None:
    width, height = 750, 1624
    image = vertical_gradient((width, height), (7, 13, 27), (9, 20, 38)).convert("RGBA")
    add_glow(image, (640, 210), 250, accent, 55)
    add_glow(image, (80, 1370), 240, BLUE, 34)
    draw = ImageDraw.Draw(image, "RGBA")

    draw.text((44, 38), "9:41", font=font(22, True), fill=(226, 232, 240, 255))
    draw.text((620, 38), "●  ▮▮▮  ▰", font=font(16), fill=(148, 163, 184, 235))
    draw.text((48, 112), "ESCore App", font=font(34, True), fill=(241, 245, 249, 255))
    draw.text((48, 160), "移动端软件截图占位", font=font(19), fill=(148, 163, 184, 235))
    draw.ellipse((640, 108, 692, 160), fill=(*accent, 40), outline=(*accent, 180), width=2)
    draw.text((666, 134), "E", font=font(22, True), fill=(*accent, 255), anchor="mm")

    dashed_box(draw, (42, 232, 708, 1250), accent, radius=28)
    # 手机轮廓图标
    rounded(draw, (323, 462, 427, 614), 20, fill=(*accent, 22), outline=(*accent, 210), width=3)
    draw.rounded_rectangle((347, 488, 403, 568), 8, fill=(*accent, 60))
    draw.ellipse((366, 583, 384, 593), fill=(*accent, 230))
    draw.text((375, 684), title, font=font(32, True), fill=(241, 245, 249, 255), anchor="mm")
    draw.text((375, 734), subtitle, font=font(20), fill=(148, 163, 184, 255), anchor="mm")
    draw.text((375, 802), "移动端截图 · 750 × 1624", font=font(17), fill=(148, 163, 184, 230), anchor="mm")
    draw.text((375, 858), f"static/img/screenshots/app/{filename}", font=font(15), fill=(*accent, 240), anchor="mm")
    rounded(draw, (302, 906, 448, 948), 21, fill=(*accent, 26), outline=(*accent, 160), width=1)
    draw.text((375, 927), index, font=font(16, True), fill=(*accent, 255), anchor="mm")

    # 底部导航骨架
    for i in range(4):
        x = 138 + i * 158
        draw.ellipse((x - 10, 1360, x + 10, 1380), fill=(*accent, 190) if i == 0 else (100, 116, 139, 130))
        draw.rounded_rectangle((x - 22, 1400, x + 22, 1408), 4, fill=(*accent, 170) if i == 0 else (100, 116, 139, 90))

    draw.text((48, 1516), "多端一致 · 实时同步", font=font(17), fill=(148, 163, 184, 220))
    draw.text((560, 1516), "PLACEHOLDER", font=font(14, True), fill=(*accent, 220))
    image.convert("RGB").save(APP_DIR / filename, "PNG", optimize=True)


def social_card() -> None:
    width, height = 1200, 630
    image = vertical_gradient((width, height), (5, 10, 22), (11, 23, 43)).convert("RGBA")
    add_glow(image, (980, 86), 340, CYAN, 60)
    add_glow(image, (760, 620), 320, VIOLET, 42)
    grid = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    add_grid(ImageDraw.Draw(grid), (width, height), 54)
    image.alpha_composite(grid)
    draw = ImageDraw.Draw(image, "RGBA")

    # 品牌标记
    rounded(draw, (76, 68, 144, 136), 18, fill=(15, 23, 42, 255), outline=(34, 211, 238, 150), width=2)
    draw.line((94, 88, 94, 116), fill=(34, 211, 238, 255), width=5)
    draw.line((94, 89, 122, 89), fill=(226, 232, 240, 255), width=5)
    draw.line((94, 101, 116, 101), fill=(226, 232, 240, 255), width=5)
    draw.line((94, 113, 108, 113), fill=(226, 232, 240, 255), width=5)
    draw.text((164, 82), "ESCore", font=font(30, True), fill=(241, 245, 249, 255))
    draw.text((164, 120), "企业实时通信框架", font=font(16), fill=(148, 163, 184, 235))

    draw.text((76, 214), "让实时通信成为", font=font(54, True), fill=(241, 245, 249, 255))
    draw.text((76, 284), "企业的底层能力", font=font(54, True), fill=(34, 211, 238, 255))
    draw.text((80, 374), "uWebSockets.js 内核 · 企业中台 · IoT · AI Agent · 多端应用", font=font(20), fill=(203, 213, 225, 240))
    draw.text((80, 426), "https://github.com/newlan/ESCore", font=font(20, True), fill=(96, 165, 250, 255))

    for i, label in enumerate(("10–30×", "1–3 KB", "双端口")):
        x = 80 + i * 210
        rounded(draw, (x, 492, x + 184, 570), 18, fill=(15, 23, 42, 220), outline=(71, 85, 105, 110), width=1)
        draw.text((x + 92, 516), label, font=font(24, True), fill=(226, 232, 240, 255), anchor="mm")
        caption = ("通信吞吐参考", "单连接内存", "HTTP + WSS")[i]
        draw.text((x + 92, 550), caption, font=font(14), fill=(148, 163, 184, 235), anchor="mm")

    # 右侧抽象终端
    rounded(draw, (742, 152, 1120, 486), 28, fill=(8, 15, 29, 228), outline=(71, 85, 105, 110), width=2)
    rounded(draw, (742, 152, 1120, 202), 28, fill=(15, 23, 42, 248))
    draw.ellipse((770, 170, 782, 182), fill=(248, 113, 113, 235))
    draw.ellipse((790, 170, 802, 182), fill=(251, 191, 36, 235))
    draw.ellipse((810, 170, 822, 182), fill=(74, 222, 128, 235))
    draw.text((856, 165), "socket · live", font=font(15), fill=(148, 163, 184, 240))

    code_lines = (
        ("io.on(\"connection\", socket => {", (125, 211, 252)),
        ("  socket.join(\"tenant:acme\");", (226, 232, 240)),
        ("  io.to(\"tenant:acme\").emit(", (226, 232, 240)),
        ("    \"order:updated\", payload);", (134, 239, 172)),
        ("});", (125, 211, 252)),
    )
    for i, (line, color) in enumerate(code_lines):
        draw.text((776, 244 + i * 40), line, font=font(17), fill=(*color, 245))
    draw.line((776, 448, 1084, 448), fill=(71, 85, 105, 100), width=1)
    draw.ellipse((778, 470, 792, 484), fill=(34, 211, 238, 255))
    draw.text((806, 460), "实时通道在线 · 多实例广播", font=font(16), fill=(203, 213, 225, 235))

    image.convert("RGB").save(IMG_DIR / "social-card.png", "PNG", optimize=True)


def architecture_webp() -> None:
    source = IMG_DIR / "architecture.png"
    if source.exists():
        with Image.open(source) as image:
            image.convert("RGB").save(IMG_DIR / "architecture.webp", "WEBP", quality=90, method=6)


def main() -> None:
    WIN_DIR.mkdir(parents=True, exist_ok=True)
    APP_DIR.mkdir(parents=True, exist_ok=True)
    desktop_placeholder("windows-main.png", "截图 01 / MAIN", "放置 Windows 主界面截图", "推荐 1440 × 900，展示核心工作台", CYAN)
    desktop_placeholder("windows-realtime.png", "截图 02 / REALTIME", "放置实时看板截图", "推荐 1440 × 900，展示连接与消息", (96, 165, 250))
    desktop_placeholder("windows-settings.png", "截图 03 / SETTINGS", "放置设置中心截图", "推荐 1440 × 900，展示系统能力", VIOLET)
    app_placeholder("app-home.png", "截图 01 / 首页", "放置 App 首页截图", "展示核心入口与实时数据", CYAN)
    app_placeholder("app-messages.png", "截图 02 / 消息", "放置消息列表截图", "展示会话与实时推送", (96, 165, 250))
    app_placeholder("app-profile.png", "截图 03 / 我的", "放置个人中心截图", "展示账号与设置能力", VIOLET)
    social_card()
    architecture_webp()
    print("Assets generated:")
    for path in sorted([*WIN_DIR.glob("*.png"), *APP_DIR.glob("*.png"), IMG_DIR / "social-card.png", IMG_DIR / "architecture.webp"]):
        print(f"  {path.relative_to(ROOT)}  {path.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()