from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/accueil')
def accueil():
    # For now, return a simple message. Later, this will render a partial template.
    return '<h1>Contenu de l\'accueil chargé depuis Python!</h1>'

# Add other routes as you build them
# @app.route('/annuaire_recherche')
# def annuaire_recherche():
#     return 'Page de recherche annuaire'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)