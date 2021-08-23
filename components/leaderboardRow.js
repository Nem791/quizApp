class Row {
    $container;
    $columnName;
    $columnScore;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('row', 'justify-content-center', 'row-value');

        this.$columnName = document.createElement('div');
        this.$columnName.classList.add('col-4', 'text-center');

        this.$columnScore = document.createElement('div');
        this.$columnScore.classList.add('col-4', 'text-center');
    }

    render() {
        this.$container.appendChild(this.$columnName);
        this.$container.appendChild(this.$columnScore);

        return this.$container;
    }
}

export {Row};