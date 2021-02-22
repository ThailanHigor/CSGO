"""Contact table

Revision ID: 39b9e9b4a727
Revises: 72f97ddf058c
Create Date: 2021-02-21 22:46:23.331024

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '39b9e9b4a727'
down_revision = '72f97ddf058c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Contacts',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('message', sa.Text(), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('Contacts')
    # ### end Alembic commands ###