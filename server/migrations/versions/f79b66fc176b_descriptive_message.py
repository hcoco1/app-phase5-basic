"""<descriptive message>

Revision ID: f79b66fc176b
Revises: d2b1aacd3727
Create Date: 2023-10-02 21:02:35.466061

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f79b66fc176b'
down_revision = 'd2b1aacd3727'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('address')
        batch_op.drop_column('last_name')
        batch_op.drop_column('birth_date')
        batch_op.drop_column('hobbies')
        batch_op.drop_column('privacy_settings')
        batch_op.drop_column('biography')
        batch_op.drop_column('join_date')
        batch_op.drop_column('last_login')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('last_login', sa.DATE(), nullable=True))
        batch_op.add_column(sa.Column('join_date', sa.DATE(), nullable=True))
        batch_op.add_column(sa.Column('biography', sa.VARCHAR(length=512), nullable=True))
        batch_op.add_column(sa.Column('privacy_settings', sa.VARCHAR(length=100), nullable=True))
        batch_op.add_column(sa.Column('hobbies', sa.VARCHAR(length=512), nullable=True))
        batch_op.add_column(sa.Column('birth_date', sa.DATE(), nullable=True))
        batch_op.add_column(sa.Column('last_name', sa.VARCHAR(length=50), nullable=True))
        batch_op.add_column(sa.Column('address', sa.VARCHAR(length=512), nullable=True))

    # ### end Alembic commands ###
