// vue-test-utils という Vue.js がテスト用に提供しているライブラリから shallowMount という関数のみインポートします
import { shallowMount } from "@vue/test-utils";
// テスト対象のコンポーネントをインポートします
import PageTitle from "@/components/PageTitle.vue";

// テストするコンポーネントを宣言
describe("PageTitle.vue", () => {
  // テストの内容を記述
  it("タイトルが表示されること", () => {
    // shallowMount で擬似的にコンポーネントの表示を行います
    const wrapper = shallowMount(PageTitle, {
      // props にデータを渡す場合は propsData を使用します
      propsData: { title: "サンプルタイトル" }
    });
    // コンポーネントの表示文字列に "サンプルタイトル" が含まれていることを確認する
    expect(wrapper.text()).toMatch("サンプルタイトル");
  });
});
