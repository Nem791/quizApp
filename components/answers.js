class Answers {
    $container;
    $radioBtn;
    $answers;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('form-check', 'form-check-inline');

        this.$radioBtn = document.createElement('input');
        this.$radioBtn.classList.add('form-check-input');
        this.$radioBtn.type = 'radio';

        this.$answers = document.createElement('label');
        this.$answers.classList.add('form-check-label');
    }

    render() {
        this.$container.appendChild(this.$radioBtn);
        this.$container.appendChild(this.$answers);
        return this.$container;
    }
}

export {Answers};