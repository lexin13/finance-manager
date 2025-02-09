import React from 'react';
import { CategoryCard, CategoryCardProps } from 'src/widgets/CategoryCard/CategoryCard';

import style from './CategoryList.module.scss';

export interface CategoryListProps {
  categories: CategoryCardProps[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <div className={style['category-list']}>
      {categories.map((category) => (
        <div key={category.id}>
          <CategoryCard {...category} onEditClick={onEdit} onDeleteClick={onDelete} />
        </div>
      ))}
    </div>
  );
};
