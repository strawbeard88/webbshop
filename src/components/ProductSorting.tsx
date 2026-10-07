import '../styling/productSorting.css';

type ProductSortingProps = {
    categories: string[];
    selectedCategories: string[];
    onToggleCategory: (category: string) => void;
    nameFilter: string;
    onNameFilterChange: (value: string) => void;
};

export default function ProductSorting({
    categories,
    selectedCategories,
    onToggleCategory,
    nameFilter,
    onNameFilterChange,
}: ProductSortingProps) {
    return (
        <section className="product-sorting">
            <div className="product-sorting__search">
                <label htmlFor="product-name-filter">Sök kortnamn</label>
                <input
                    id="product-name-filter"
                    type="text"
                    value={nameFilter}
                    onChange={(event) => onNameFilterChange(event.target.value)}
                    placeholder="Skriv kortnamn..."
                />
            </div>

            <div className="product-sorting__categories">
                {categories.map((category) => (
                    <label key={category} className="product-sorting__category-item">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => onToggleCategory(category)}
                        />
                        {category}
                    </label>
                ))}
            </div>
        </section>
    );
}
