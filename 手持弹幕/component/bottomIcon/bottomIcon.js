Component({
    properties: {
        changeName: String,
        currentIndex: Number,
        img: String,
        title: String
    },
    methods: {
        _onChangeEvent: function(e) {
            var t = e.currentTarget.dataset.changeName;
            this.triggerEvent("onChangeEvent", t);
        }
    }
});