from app import app, db, Student

with app.app_context():
    try:
        # Drop the Student table
        Student.__table__.drop(db.engine, checkfirst=True)
        print('Dropped Student table')
        # Recreate the table
        Student.__table__.create(db.engine, checkfirst=True)
        print('Created Student table with updated schema')
    except Exception as e:
        print(f'Error: {type(e).__name__}: {e}')
