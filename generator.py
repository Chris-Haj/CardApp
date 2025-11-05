import barcode
from barcode.writer import ImageWriter

# The barcode value
barcode_number = "Hello this is me"

# Set barcode writer options for 2x width
writer = ImageWriter()
writer.set_options({
    'module_width': 1.2,       # 2x the original width of 0.6
    'module_height': 100.0,    # Keep height reasonable
    'font_size': 18,
    'text_distance': 10,
    'quiet_zone': 1,
    'dpi': 300
})

# Generate and save the barcode
code128 = barcode.get('code128', barcode_number, writer=writer)
code128.save("wide_barcode")
