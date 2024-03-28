from jinja2 import Template
from weasyprint import HTML

def render_html(template_path, data):
    with open(template_path, 'r') as file:
        template_content = file.read()
    template = Template(template_content)
    rendered_html = template.render(detectados=data['detectados'], ausentes=data['ausentes'])
    return rendered_html

def generate_pdf(html_content, output_path):
    HTML(string=html_content).write_pdf(output_path)

# Sample data
data = {
    'detectados': [
        {'name': 'Item 1', 'quantity': 3},
        {'name': 'Item 2', 'quantity': 5},
        {'name': 'Item 3', 'quantity': 8}
    ],
    'ausentes': [
        {'name': 'Item 4', 'quantity': 3},
        {'name': 'Item 5', 'quantity': 7}
    ]
}

# Path to your HTML template
template_path = 'relatorio.html'

# Render HTML with dynamic data
html_content = render_html(template_path, data)

# Path to your output PDF file
output_path = 'relatorio.pdf'

# Generate PDF from HTML
generate_pdf(html_content, output_path)
