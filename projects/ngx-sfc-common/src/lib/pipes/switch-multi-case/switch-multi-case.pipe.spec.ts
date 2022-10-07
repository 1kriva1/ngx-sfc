import { SwitchMultiCasePipe } from './switch-multi-case.pipe';

describe('Pipe: SwitchMultiCase', () => {
  const pipe = new SwitchMultiCasePipe();

  fit('Should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  fit('Should return false', () => {
    expect(pipe.transform(['test1'], 'test')).toBeFalse();
  });

  fit('Should return false, when cases is empty', () => {
    expect(pipe.transform([], 'test')).toBeFalse();
  });

  fit('Should return value', () => {
    expect(pipe.transform(['test'], 'test')).toEqual('test');
  });
});
