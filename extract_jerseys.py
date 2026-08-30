from PIL import Image
import os

# Načtení obrázku
img_path = 'jerseys/Jerseys.png'
img = Image.open(img_path)
width, height = img.size

print(f"Obrázek rozměry: {width}x{height}")

# Obrázek má 7 sloupců a 4 řady
cols = 7
rows = 4
dres_width = width // cols
dres_height = height // rows

print(f"Rozměry jednoho dresu: {dres_width}x{dres_height}")

# Mapování pozic na Champions League týmy
# Pozice: (řada, sloupec) -> tým
team_positions = {
    0: 'real-madrid',
    1: 'barcelona',
    2: 'bayern',
    3: 'manchester-city',
    4: 'liverpool',
    5: 'arsenal',
    6: 'psg',
    7: 'dortmund',
    8: 'inter',
    9: 'juventus',
    10: 'benfica',
    11: 'porto',
}

teams_to_extract = list(team_positions.values())

# Vyříznutí dresů
count = 0
for row in range(rows):
    for col in range(cols):
        if count >= len(teams_to_extract):
            break
        
        left = col * dres_width
        top = row * dres_height
        right = left + dres_width
        bottom = top + dres_height
        
        dres_img = img.crop((left, top, right, bottom))
        team_name = teams_to_extract[count]
        output_path = f'jerseys/{team_name}-kit.png'
        dres_img.save(output_path)
        print(f"✓ Uložen: {output_path}")
        count += 1

print(f"\nCelkem vyříznutých dresů: {count}")
