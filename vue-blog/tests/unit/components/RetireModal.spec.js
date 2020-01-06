import { mount } from "@vue/test-utils";
import RetireModal from "@/components/RetireModal.vue";

describe("RetireModal.vue", () => {
  it("valueがtrueならばアクティブである", () => {
    const wrapper = mount(RetireModal, {
      propsData: { value: true }
    });
    // モーダルが表示状態なら is-active クラスが付いているはず
    expect(wrapper.classes()).toContain("is-active");
  });
  it("valueがfalseならばアクティブではない", () => {
    const wrapper = mount(RetireModal, {
      propsData: { value: false }
    });
    // not を使うことで逆を確認します
    expect(wrapper.classes()).not.toContain("is-active");
  });
  it("初期表示時にパスワードエラーは表示されない", () => {
    const wrapper = mount(RetireModal, {
      propsData: { value: true }
    });
    expect(wrapper.text()).not.toMatch("現在のパスワードは必須です");
  });
  // describe をネストすることでテスト対象をカテゴリー分けすることができます
  describe("退会ボタンクリックテスト", () => {
    it("パスワードに入力がないときはエラーを表示する", () => {
      const wrapper = mount(RetireModal, {
        propsData: { value: true }
      });
      // is-danger クラスが付いたボタンが退会ボタン
      // trigger("click") でユーザーのクリックをエミュレーションします
      wrapper.find("button.is-danger").trigger("click");
      // エラーメッセージが表示されていることを確認
      expect(wrapper.text()).toMatch("現在のパスワードは必須です");
    });
    it("パスワードに入力がないときはretireイベントは発生しない", () => {
      const wrapper = mount(RetireModal, {
        propsData: { value: true }
      });
      wrapper.find("button.is-danger").trigger("click");
      // emitted() で発生したイベントを取得できます
      // 入力エラーなので retire イベントは発生しないことを確認しています
      expect(wrapper.emitted().retire).toBeFalsy();
    });
    it("パスワードに入力があるときはretireイベントが発生する", () => {
      const wrapper = mount(RetireModal, {
        propsData: { value: true }
      });
      // type属性がpasswordなinputタグを取得し、値を設定しています
      wrapper.find("input[type='password']").setValue("password");
      wrapper.find("button.is-danger").trigger("click");
      // 入力エラーはないので retire イベントが発生することを確認しています
      expect(wrapper.emitted().retire).toBeTruthy();
    });
    it("retireイベントのパラメータに入力されたパスワードがセットされている", () => {
      const wrapper = mount(RetireModal, {
        propsData: { value: true }
      });
      wrapper.find("input[type='password']").setValue("password");
      wrapper.find("button.is-danger").trigger("click");
      // emitted では各イベントが発生した回数の配列があり、さらに発生したときのパラメータの配列があるので[0][0]で最初に発生したときの最初のパラメータを取得しています
      expect(wrapper.emitted().retire[0][0].password).toBe("password");
    });
  });
});
